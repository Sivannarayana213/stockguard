package com.ven.ShopSathi.integration.shopify.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ven.ShopSathi.integration.shopify.service.ShopifyWebhookService;
import com.ven.ShopSathi.inventory.entity.Product;
import com.ven.ShopSathi.inventory.repository.ProductRepository;
import com.ven.ShopSathi.store.entity.StoreConnection;
import com.ven.ShopSathi.store.repository.StoreConnectionRepository;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShopifyOAuthService {

    @Value("${shopify.api.key}")
    private String apiKey;

    @Value("${shopify.api.secret}")
    private String apiSecret;

    private final StoreConnectionRepository storeRepo;
    private final ShopifyWebhookService webhookService;
    private final ProductRepository productRepository;
    private final RestTemplate restTemplate;

    /**
     * 🔥 Exchange authorization code for access token
     */
    public void exchangeCodeForToken(String shop, String code) {

        validateShopDomain(shop);

        try {
            log.info("Exchanging code for token. Shop={}", shop);

            String tokenUrl = "https://" + shop + "/admin/oauth/access_token";

            Map<String, String> requestBody = Map.of(
                    "client_id", apiKey,
                    "client_secret", apiSecret,
                    "code", code
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> entity =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map<String, Object>> response =
                    restTemplate.exchange(
                            tokenUrl,
                            HttpMethod.POST,
                            entity,
                            new ParameterizedTypeReference<>() {}
                    );

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new IllegalStateException("Token exchange failed. Status=" + response.getStatusCode());
            }

            Map<String, Object> body = response.getBody();

            if (body == null || !body.containsKey("access_token")) {
                throw new IllegalStateException("Access token missing in Shopify response");
            }

            String accessToken = (String) body.get("access_token");

            if (accessToken == null || accessToken.isBlank()) {
                throw new IllegalStateException("Invalid access token received");
            }

            saveStoreConnection(shop, accessToken);

            // Register webhook
            webhookService.registerInventoryWebhook(shop, accessToken);

            // Sync products (⚠️ consider moving to async job)
            syncProducts(shop, accessToken);

            log.info("Shop connected successfully: {}", shop);

        } catch (Exception e) {
            log.error("OAuth token exchange failed for shop {}", shop, e);
            throw new RuntimeException("Shopify OAuth failed", e);
        }
    }

    /**
     * 🔥 Validate shop domain
     */
    private void validateShopDomain(String shop) {
        if (shop == null || !shop.endsWith(".myshopify.com")) {
            throw new IllegalArgumentException("Invalid Shopify shop domain");
        }
    }

    /**
     * 🔥 Save or update store connection
     */
    private void saveStoreConnection(String shop, String accessToken) {

        StoreConnection store =
                storeRepo.findByShopDomain(shop)
                        .orElse(new StoreConnection());

        store.setShopDomain(shop);
        store.setAccessToken(accessToken);
        store.setConnected(true);

        storeRepo.save(store);
    }

    /**
     * 🔥 Initial product sync
     */
    private void syncProducts(String shop, String accessToken) {

        try {

            String url = "https://" + shop + "/admin/api/2024-01/products.json";

            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Shopify-Access-Token", accessToken);

            ResponseEntity<Map<String, Object>> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.GET,
                            new HttpEntity<>(headers),
                            new ParameterizedTypeReference<>() {}
                    );

            Map<String, Object> body = response.getBody();

            if (body == null || !body.containsKey("products")) {
                log.warn("No products found for shop {}", shop);
                return;
            }

            Object rawProducts = body.get("products");

            if (!(rawProducts instanceof List<?> rawList)) {
                return;
            }

            for (Object item : rawList) {

                if (!(item instanceof Map<?, ?> rawMap)) continue;

                @SuppressWarnings("unchecked")
                Map<String, Object> productData =
                        (Map<String, Object>) rawMap;

                String title = (String) productData.get("title");

                @SuppressWarnings("unchecked")
                List<Map<String, Object>> variants =
                        (List<Map<String, Object>>) productData.get("variants");

                if (variants == null) continue;

                for (Map<String, Object> variant : variants) {

                    String inventoryItemId =
                            String.valueOf(variant.get("inventory_item_id"));

                    Number stockNumber =
                            (Number) variant.get("inventory_quantity");

                    Integer stock =
                            stockNumber != null ? stockNumber.intValue() : 0;

                    Product product =
                            productRepository
                                    .findByInventoryItemId(inventoryItemId)
                                    .orElse(new Product());

                    product.setName(title);
                    product.setSku((String) variant.get("sku"));
                    product.setStock(stock);
                    product.setInventoryItemId(inventoryItemId);

                    productRepository.save(product);
                }
            }

        } catch (Exception e) {
            log.error("Product sync failed for shop {}", shop, e);
        }
    }
}
