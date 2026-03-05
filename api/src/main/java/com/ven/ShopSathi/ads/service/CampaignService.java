package com.ven.ShopSathi.ads.service;


import com.ven.ShopSathi.ads.dto.CampaignRequestDTO;
import com.ven.ShopSathi.ads.entity.Campaign;
import com.ven.ShopSathi.ads.repository.CampaignRepository;
import com.ven.ShopSathi.common.enums.CampaignStatus;
import com.ven.ShopSathi.inventory.entity.Product;
import com.ven.ShopSathi.inventory.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final ProductRepository productRepository;

    public Campaign createCampaign(CampaignRequestDTO dto) {

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Campaign campaign = Campaign.builder()
            .product(product)
            .platform(dto.getPlatform())
            .campaignId(dto.getCampaignId())
            .status(CampaignStatus.ACTIVE)
            .build();

        return campaignRepository.save(campaign);
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Campaign pauseCampaign(Long id) {

        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        campaign.setStatus(CampaignStatus.PAUSED);

        return campaignRepository.save(campaign);
    }
}

