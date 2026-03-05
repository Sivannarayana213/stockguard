package com.ven.ShopSathi.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ven.ShopSathi.store.entity.StoreConnection;

import java.util.Optional;

public interface StoreConnectionRepository
        extends JpaRepository<StoreConnection, Long> {

    Optional<StoreConnection> findByShopDomain(String shopDomain);
}
