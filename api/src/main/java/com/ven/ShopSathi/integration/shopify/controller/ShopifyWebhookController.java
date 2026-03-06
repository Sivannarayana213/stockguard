package com.ven.ShopSathi.integration.shopify.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.ven.ShopSathi.inventory.service.InventoryService;

import java.util.Map;

@RestController
@RequestMapping("/api/webhooks/shopify")
@RequiredArgsConstructor
public class ShopifyWebhookController {

    private final InventoryService inventoryService;

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

