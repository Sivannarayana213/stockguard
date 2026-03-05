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
    public String handleInventoryWebhook(
            @RequestBody Map<String, Object> payload) {

        String inventoryItemId =
                String.valueOf(payload.get("inventory_item_id"));

        Number availableNumber =
                (Number) payload.get("available");

        Integer available =
                availableNumber != null
                        ? availableNumber.intValue()
                        : 0;

        inventoryService.updateStockFromShopifyWebhook(
                inventoryItemId,
                available
        );

        return "Webhook processed";
    }
}

