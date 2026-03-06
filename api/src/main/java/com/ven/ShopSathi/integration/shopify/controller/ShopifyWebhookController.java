package com.ven.ShopSathi.integration.shopify.controller;

import com.ven.ShopSathi.inventory.service.InventoryService;
import com.ven.ShopSathi.integration.shopify.security.ShopifyHmacValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhooks/shopify")
@RequiredArgsConstructor
public class ShopifyWebhookController {

    private final InventoryService inventoryService;
    private final ShopifyHmacValidator shopifyHmacValidator;

    /**
     * 🔥 Shopify Inventory Update Webhook
     */
    @PostMapping("/inventory")
    public ResponseEntity<String> handleInventoryWebhook(
            @RequestHeader("X-Shopify-Hmac-Sha256") String hmac,
            @RequestBody String rawBody) {

        // ✅ STEP 1 — VERIFY HMAC (MANDATORY)
        if (!shopifyHmacValidator.isValidWebhookHmac(rawBody, hmac)) {
            return ResponseEntity.status(401).body("Invalid HMAC");
        }

        try {
            // ✅ STEP 2 — PROCESS WEBHOOK
            inventoryService.handleInventoryWebhook(rawBody);

            return ResponseEntity.ok("Webhook processed");

        } catch (Exception e) {
            e.printStackTrace(); // keep for debugging now
            return ResponseEntity.status(500).body("Webhook failed");
        }
    }
}
