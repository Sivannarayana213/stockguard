package com.ven.ShopSathi.dashboard.controller;

import com.ven.ShopSathi.dashboard.dto.DashboardStatsDTO;
import com.ven.ShopSathi.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public DashboardStatsDTO stats(@RequestParam String shop) {
        return dashboardService.getStats(shop);
    }
}
