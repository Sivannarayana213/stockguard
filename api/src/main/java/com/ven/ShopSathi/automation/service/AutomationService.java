package com.ven.ShopSathi.automation.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ven.ShopSathi.ads.entity.Campaign;
import com.ven.ShopSathi.ads.repository.CampaignRepository;
import com.ven.ShopSathi.automation.entity.ActionLog;
import com.ven.ShopSathi.automation.repository.ActionLogRepository;
import com.ven.ShopSathi.common.enums.CampaignStatus;
import com.ven.ShopSathi.integration.meta.MetaAdsService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AutomationService {

    private final CampaignRepository campaignRepository;
    private final ActionLogRepository actionLogRepository;
    private final MetaAdsService metaAdsService;

    private static final int THRESHOLD = 50;

    @Transactional
    public void monitorStockAndPauseAds() {

        List<Campaign> campaigns = campaignRepository.findAll();

        for (Campaign campaign : campaigns) {
            int stock = campaign.getProduct().getStock();

            if (stock < THRESHOLD && campaign.getStatus() == CampaignStatus.ACTIVE) {
                // Pause campaign if stock is low
                log.info(" Low Stock! Pausing Meta Campaign: {}", campaign.getCampaignId());
                
                // FIX: Call the method directly without assigning to a boolean
                metaAdsService.pauseCampaign(campaign.getCampaignId());

                campaign.setStatus(CampaignStatus.PAUSED);
                campaignRepository.save(campaign);

                ActionLog actionLog = ActionLog.builder()
                        .campaign(campaign)
                        .actionType("AUTO_PAUSE_META")
                        .saveAmount(500.0)
                        .timestamp(LocalDateTime.now())
                        .build();

                actionLogRepository.save(actionLog);
                log.info("✅ Campaign {} paused due to low stock ({} units)", 
                    campaign.getCampaignId(), stock);

            } else if (stock >= THRESHOLD && campaign.getStatus() == CampaignStatus.PAUSED) {
                // Resume campaign if stock is recovered
                log.info(" Stock Recovered! Resuming Meta Campaign: {}", campaign.getCampaignId());
                
                // FIX: Call the method directly without assigning to a boolean
                metaAdsService.resumeCampaign(campaign.getCampaignId());

                campaign.setStatus(CampaignStatus.ACTIVE);
                campaignRepository.save(campaign);

                ActionLog actionLogResume = ActionLog.builder()
                        .campaign(campaign)
                        .actionType("AUTO_RESUME_META")
                        .saveAmount(0.0)
                        .timestamp(LocalDateTime.now())
                        .build();

                actionLogRepository.save(actionLogResume);
                log.info("✅ Campaign {} resumed due to stock recovery ({} units)", 
                    campaign.getCampaignId(), stock);
            }
        }
    }

    @Transactional
    public void manuallyPauseCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
            .orElseThrow(() -> new RuntimeException("Campaign not found"));

        if (campaign.getStatus() == CampaignStatus.ACTIVE) {
            // FIX: Call the method directly
            metaAdsService.pauseCampaign(campaign.getCampaignId());
            
            campaign.setStatus(CampaignStatus.PAUSED);
            campaignRepository.save(campaign);

            ActionLog manualPauseLog = ActionLog.builder()
                    .campaign(campaign)
                    .actionType("MANUAL_PAUSE_META")
                    .saveAmount(0.0)
                    .timestamp(LocalDateTime.now())
                    .build();

            actionLogRepository.save(manualPauseLog);
            log.info("✅ Campaign {} manually paused", campaignId);
        }
    }

    @Transactional
    public void manuallyResumeCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
            .orElseThrow(() -> new RuntimeException("Campaign not found"));

        if (campaign.getStatus() == CampaignStatus.PAUSED) {
            // FIX: Call the method directly
            metaAdsService.resumeCampaign(campaign.getCampaignId());
            
            campaign.setStatus(CampaignStatus.ACTIVE);
            campaignRepository.save(campaign);

            ActionLog manualResumeLog = ActionLog.builder()
                    .campaign(campaign)
                    .actionType("MANUAL_RESUME_META")
                    .saveAmount(0.0)
                    .timestamp(LocalDateTime.now())
                    .build();

            actionLogRepository.save(manualResumeLog);
            log.info("✅ Campaign {} manually resumed", campaignId);
        }
    }
}