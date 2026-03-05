package com.ven.ShopSathi.integration.meta;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MetaAdsService {

    @Value("${meta.access.token}")
    private String accessToken;

    private static final String GRAPH_BASE = "https://graph.facebook.com/v19.0/";

    private final RestTemplate restTemplate = new RestTemplate();

    // =========================================
    // GET CAMPAIGNS
    // =========================================
    public Map<String, Object> getCampaigns(String adAccountId) {

        if (accessToken == null || accessToken.isBlank()) {
            throw new IllegalStateException("Meta access token is not configured");
        }

        if (!adAccountId.startsWith("act_")) {
            adAccountId = "act_" + adAccountId;
        }

        String url = GRAPH_BASE +
                adAccountId +
                "/campaigns?access_token=" + accessToken;

        ResponseEntity<Map<String, Object>> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<>() {}
                );

        return response.getBody();
    }

    // =========================================
    // PAUSE CAMPAIGN
    // =========================================
    public boolean pauseCampaign(String campaignId) {

        return updateCampaignStatus(campaignId, "PAUSED");
    }

    // =========================================
    // RESUME CAMPAIGN
    // =========================================
    public boolean resumeCampaign(String campaignId) {

        return updateCampaignStatus(campaignId, "ACTIVE");
    }

    // =========================================
    // INTERNAL STATUS UPDATE METHOD
    // =========================================
    private boolean updateCampaignStatus(String campaignId, String status) {

        try {

            if (accessToken == null || accessToken.isBlank()) {
                throw new IllegalStateException("Meta access token is not configured");
            }

            String url = GRAPH_BASE + campaignId;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String body = "{ \"status\": \"" + status + "\" }";

            HttpEntity<String> request =
                    new HttpEntity<>(body, headers);

            restTemplate.postForEntity(
                    url + "?access_token=" + accessToken,
                    request,
                    String.class
            );

            return true;

        } catch (Exception e) {
            System.out.println("Meta campaign update failed: " + e.getMessage());
            return false;
        }
    }
}
