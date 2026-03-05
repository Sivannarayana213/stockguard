package com.ven.ShopSathi.ads.controller;

import com.ven.ShopSathi.ads.dto.CampaignRequestDTO;
import com.ven.ShopSathi.ads.entity.Campaign;
import com.ven.ShopSathi.ads.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
public class CampaignController {

    private final CampaignService campaignService;

    @PostMapping
    public Campaign create(@RequestBody CampaignRequestDTO dto) {
        return campaignService.createCampaign(dto);
    }

    @GetMapping
    public List<Campaign> list() {
        return campaignService.getAllCampaigns();
    }
    @PatchMapping("/{id}/pause")
    public Campaign pause(@PathVariable Long id){
        return campaignService.pauseCampaign(id);
    }
}
