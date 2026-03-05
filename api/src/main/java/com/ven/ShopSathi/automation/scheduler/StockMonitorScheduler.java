package com.ven.ShopSathi.automation.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ven.ShopSathi.automation.service.AutomationService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StockMonitorScheduler {

    private final AutomationService automationService;

    // Runs every 1 minute
    @Scheduled(fixedRate = 300000)
    public void runStockCheck(){
        automationService.monitorStockAndPauseAds();
    }
    
}
