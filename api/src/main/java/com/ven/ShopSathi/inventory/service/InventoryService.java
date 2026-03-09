package com.ven.ShopSathi.inventory.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ven.ShopSathi.inventory.dto.ProductRequestDTO;
import com.ven.ShopSathi.inventory.dto.ProductResponseDTO;
import com.ven.ShopSathi.inventory.entity.Product;
import com.ven.ShopSathi.inventory.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final ProductRepository productRepository;

    // ✅ Create Product
    public ProductResponseDTO createProduct(ProductRequestDTO dto) {

        Product product = Product.builder()  //convert DTO --> Entity
                .name(dto.getName())
                .sku(dto.getSku())
                .stock(dto.getStock())
                .build();

        Product saved = productRepository.save(product); // save to database

        return mapToResponse(saved); // convert Entity --> ResponseDTO
    }

    // ✅ List All Products
    public List<ProductResponseDTO> getAllProducts() {

        return productRepository.findAll() // SELECT * FROM product 
                .stream() // (Then convert each product --> ProductResponseDTO)
                .map(this::mapToResponse)
                .toList();
    }

    // ✅ Update Stock
    public ProductResponseDTO updateStock(Long id, Integer newStock) {

        Product product = productRepository.findById(id) // find product
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setStock(newStock); // update stock

        Product updated = productRepository.save(product); // save again

        return mapToResponse(updated);
    }

    // Mapper
    private ProductResponseDTO mapToResponse(Product product) {  // Entity --> DTO

        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .sku(product.getSku())
                .stock(product.getStock())
                .build();
    }

    public void updateStockFromShopifyWebhook(
            String inventoryItemId,
            Integer newStock) {

        Product product = productRepository
                .findByInventoryItemId(inventoryItemId)
                .orElseThrow(() -> new RuntimeException());

        product.setStock(newStock);
        productRepository.save(product); // stock updated automatically
    }

    public void handleInventoryWebhook(String payload) {
    // Logic to parse the Shopify JSON payload and update your local database
    // Example:
    // JSONObject json = new JSONObject(payload);
    // Long shopifyId = json.getLong("id");
    // int newQty = json.getJSONArray("variants").getJSONObject(0).getInt("inventory_quantity");
    // updateLocalStock(shopifyId, newQty);
    
    System.out.println("Received Webhook Payload: " + payload);
}
}