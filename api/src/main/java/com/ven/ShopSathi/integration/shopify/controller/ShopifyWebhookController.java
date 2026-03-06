package com.ven.ShopSathi.integration.shopify.controller;

import com.ven.ShopSathi.inventory.service.InventoryService;
import com.ven.ShopSathi.integration.shopify.security.ShopifyHmacValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/webhooks/shopify")
@RequiredArgsConstructor
public class ShopifyWebhookController {

    private final InventoryService inventoryService;
    private final ShopifyHmacValidator shopifyHmacValidator;

    @PostMapping("/inventory")
    public ResponseEntity<String> handleInventoryWebhook(
        @RequestHeader("X-Shopify-Hmac-Sha256") String hmac,
        @RequestBody String rawBody) {

        if (!shopifyHmacValidator.isValidWebhookHmac(rawBody, hmac)) {
            return ResponseEntity.status(401).body("Invalid HMAC");
        }

        // parse JSON here
        return ResponseEntity.ok("Webhook processed");
    }
}

