package com.ven.ShopSathi.integration.shopify.client;

import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ShopifyWebhookClient {

    private final RestTemplate restTemplate = new RestTemplate();

    public void registerInventoryWebhook(
            String shopDomain,
            String accessToken,
            String webhookUrl
    ){

        String url = "https://" + shopDomain +
                "/admin/api/2024-01/webhooks.json";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Shopify-Access-Token", accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> webhook = Map.of(
                "webhook", Map.of(
                        "topic", "inventory_levels/update",
                        "address", webhookUrl,
                        "format", "json"
                )
        );

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(webhook, headers);

        restTemplate.exchange(
                url,
                HttpMethod.POST,
                request,
                String.class
        );
    }
}
