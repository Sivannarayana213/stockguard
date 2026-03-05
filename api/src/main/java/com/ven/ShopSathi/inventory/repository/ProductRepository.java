package com.ven.ShopSathi.inventory.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ven.ShopSathi.inventory.entity.Product;



public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByInventoryItemId(String inventoryItemId);
}
