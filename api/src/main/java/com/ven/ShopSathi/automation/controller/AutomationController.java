package com.ven.ShopSathi.automation.controller;

import com.ven.ShopSathi.automation.service.AutomationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/automation")
@RequiredArgsConstructor
public class AutomationController {

    private final AutomationService automationService;

    // ✅ Manual Trigger for Demo + Debug
    @PostMapping("/run")
    public ResponseEntity<String> runAutomationNow() {

        automationService.monitorStockAndPauseAds();

        return ResponseEntity.ok("Automation executed successfully!");
    }
}
