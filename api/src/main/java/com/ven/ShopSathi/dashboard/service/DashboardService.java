package com.ven.ShopSathi.dashboard.service;

import com.ven.ShopSathi.ads.repository.CampaignRepository;
import com.ven.ShopSathi.dashboard.dto.DashboardStatsDTO;
import com.ven.ShopSathi.inventory.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.ven.ShopSathi.common.enums.CampaignStatus;

@Service
@RequiredArgsConstructor
public class DashboardService {

        private final ProductRepository productRepository;
        private final CampaignRepository campaignRepository;

        public DashboardStatsDTO getStats(String shop) {

                long totalProducts = productRepository.count();

                long pausedCampaigns = campaignRepository.findAll()
                                .stream()
                                .filter(c -> c.getStatus() == CampaignStatus.PAUSED)
                                .count();

                long activeCampaigns = campaignRepository.findAll()
                                .stream()
                                .filter(c -> c.getStatus() == CampaignStatus.ACTIVE)
                                .count();

                double moneySaved = pausedCampaigns * 200.0;

                return DashboardStatsDTO.builder()
                                .totalProducts(totalProducts)
                                .activeCampaigns(activeCampaigns)
                                .pausedCampaigns(pausedCampaigns)
                                .moneySaved(moneySaved)
                                .recentActions(null) // Step 5 later
                                .build();
        }
}
