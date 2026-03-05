package com.ven.ShopSathi.dashboard.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DashboardStatsDTO {

    private Long totalProducts;
    private Long activeCampaigns;
    private Long pausedCampaigns;
    private Double moneySaved;

    private List<String> recentActions;
}
