package com.ven.ShopSathi.store.service;

import com.ven.ShopSathi.store.entity.StoreConnection;
import com.ven.ShopSathi.store.repository.StoreConnectionRepository;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreConnectionService {
    private final StoreConnectionRepository repository;

    public void saveStore(String shop, String token, Long userId) {

        StoreConnection store = StoreConnection.builder()
                .shopDomain(shop)
                .accessToken(token)
                .userId(userId)

                .build();

        repository.save(store);
    }

    public long getConnectedStoreCount() {
        return repository.count();
    }

    public boolean isAnyStoreConnected() {
        return repository.count() > 0;
    }

    public void disconnectStore(String shopDomain) {
        repository.findByShopDomain(shopDomain)
                .ifPresent(repository::delete);
    }
}
