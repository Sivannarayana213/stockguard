package com.ven.ShopSathi.integration.shopify.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShopifyWebhookService {

        private final RestTemplate restTemplate = new RestTemplate();

        @org.springframework.beans.factory.annotation.Value("${shopify.webhook.url}")
        private String webhookUrl;

        public void registerInventoryWebhook(String shop, String accessToken) {

                String url = "https://" + shop + "/admin/api/2024-01/webhooks.json";

                HttpHeaders headers = new HttpHeaders();
                headers.set("X-Shopify-Access-Token", accessToken);
                headers.setContentType(MediaType.APPLICATION_JSON);

                Map<String, Object> webhook = Map.of(
                                "webhook", Map.of(
                                                "topic", "inventory_levels/update",
                                                "address", webhookUrl,
                                                "format", "json"));

                restTemplate.exchange(
                                url,
                                HttpMethod.POST,
                                new HttpEntity<>(webhook, headers),
                                Map.class);
        }
}
