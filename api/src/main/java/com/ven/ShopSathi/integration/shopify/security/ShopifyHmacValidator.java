
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

    public boolean isValidHmac(Map<String, String> params) {
        try {
            String receivedHmac = params.get("hmac");
            if (receivedHmac == null) return false;

            Map<String, String> sorted = new TreeMap<>(params);
            sorted.remove("hmac");

            StringBuilder message = new StringBuilder();
            for (Map.Entry<String, String> entry : sorted.entrySet()) {
                message.append(entry.getKey())
                       .append("=")
                       .append(entry.getValue())
                       .append("&");
            }

            if (message.length() > 0) {
                message.setLength(message.length() - 1);
            }

            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(apiSecret.getBytes(), "HmacSHA256"));

            byte[] hash = mac.doFinal(message.toString().getBytes());
            String calculated = bytesToHex(hash);

            return calculated.equalsIgnoreCase(receivedHmac);

        } catch (Exception e) {
            return false;
        }
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
