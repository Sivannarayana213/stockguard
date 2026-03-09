package com.ven.ShopSathi.integration.shopify.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.*;

@Component
public class ShopifyHmacValidator {

    @Value("${shopify.api.secret}")
    private String apiSecret;

    public boolean isValidWebhookHmac(String hmac, String data) {
        try {
            SecretKeySpec secretKeySpec = new SecretKeySpec(apiSecret.getBytes(), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(secretKeySpec);
            byte[] rawHmac = mac.doFinal(data.getBytes());
            String calculatedHmac = Base64.getEncoder().encodeToString(rawHmac);
            return calculatedHmac.equals(hmac);
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isValidHmac(Map<String, String> params) {
        try {
            String hmac = params.get("hmac");
            if (hmac == null || hmac.isBlank()) {
                return false;
            }

            // Create a copy of params without hmac and timestamp for validation
            Map<String, String> paramsForValidation = new TreeMap<>(params);
            paramsForValidation.remove("hmac");
            paramsForValidation.remove("timestamp");

            // Build query string from sorted params
            List<String> paramPairs = new ArrayList<>();
            paramsForValidation.forEach((key, value) -> {
                if (value != null && !value.isBlank()) {
                    paramPairs.add(key + "=" + value);
                }
            });
            String queryString = String.join("&", paramPairs);

            // Compute HMAC
            SecretKeySpec secretKeySpec = new SecretKeySpec(apiSecret.getBytes(), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(secretKeySpec);
            byte[] rawHmac = mac.doFinal(queryString.getBytes());
            String calculatedHmac = Base64.getEncoder().encodeToString(rawHmac);

            return calculatedHmac.equals(hmac);
        } catch (Exception e) {
            return false;
        }
    }
}