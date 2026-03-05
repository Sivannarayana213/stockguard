package com.ven.ShopSathi.inventory.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ven.ShopSathi.inventory.dto.ProductRequestDTO;
import com.ven.ShopSathi.inventory.dto.ProductResponseDTO;
import com.ven.ShopSathi.inventory.service.InventoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    // Add Product
    @PostMapping
    public ProductResponseDTO create( @Valid @RequestBody ProductRequestDTO dto) {
        return inventoryService.createProduct(dto);
    }

    // List Products

    @GetMapping
    public List<ProductResponseDTO> list() {
        return inventoryService.getAllProducts();

    }

    // Update Stock

    @PatchMapping("/{id}/stock")
    public ProductResponseDTO updateStock(@PathVariable Long id,
            @RequestParam Integer stock) {
        return inventoryService.updateStock(id, stock);
    }
     @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(
            @RequestBody Map<String, Object> payload) {

        String inventoryItemId = String.valueOf(payload.get("inventory_item_id"));

        Integer available = (Integer) payload.get("available");

        inventoryService.updateStockFromShopifyWebhook(
                inventoryItemId,
                available);

        return ResponseEntity.ok("Webhook processed");
    }

}
