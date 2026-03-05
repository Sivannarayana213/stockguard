package com.ven.ShopSathi.integration.shopify.controller;

import com.ven.ShopSathi.integration.shopify.auth.ShopifyOAuthService;
import com.ven.ShopSathi.integration.shopify.security.ShopifyHmacValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
public class IntegrationController {

    private final ShopifyOAuthService oAuthService;
    private final ShopifyHmacValidator hmacValidator;

    @Value("${shopify.api.key}")
    private String shopifyApiKey;

    @Value("${shopify.redirect.uri}")
    private String redirectUri;

    @Value("${shopify.scopes}")
    private String scopes;

    private final String frontendUrl = "https://stockguard-rouge.vercel.app";

    // ENTRY
    @GetMapping("/")
    public RedirectView entry(@RequestParam(required = false) String shop) {

        if (shop == null || shop.isBlank()) {
            return new RedirectView(frontendUrl);
        }

        validateShop(shop);

        return new RedirectView("/api/shopify/connect?shop=" + shop);
    }

    // STEP 1
    @GetMapping("/api/shopify/connect")
    public RedirectView connect(@RequestParam String shop) {

        validateShop(shop);

        String state = UUID.randomUUID().toString();

        String authUrl = String.format(
                "https://%s/admin/oauth/authorize?client_id=%s&scope=%s&redirect_uri=%s&state=%s",
                shop,
                shopifyApiKey,
                URLEncoder.encode(scopes, StandardCharsets.UTF_8),
                URLEncoder.encode(redirectUri, StandardCharsets.UTF_8),
                state
        );

        return new RedirectView(authUrl);
    }

    // STEP 2 - CALLBACK
    @GetMapping("/api/integrations/shopify/callback")
    public RedirectView callback(@RequestParam Map<String, String> params) {

        if (!hmacValidator.isValidHmac(params)) {
            throw new IllegalStateException("Invalid HMAC");
        }

        String shop = params.get("shop");
        String code = params.get("code");
        String host = params.get("host");

        validateShop(shop);

        oAuthService.exchangeCodeForToken(shop, code);

        String redirectUrl = frontendUrl + "/shopify?shop=" +
                URLEncoder.encode(shop, StandardCharsets.UTF_8);

        if (host != null) {
            redirectUrl += "&host=" +
                    URLEncoder.encode(host, StandardCharsets.UTF_8);
        }

        return new RedirectView(redirectUrl);
    }

    private void validateShop(String shop) {
        if (shop == null || !shop.endsWith(".myshopify.com")) {
            throw new IllegalArgumentException("Invalid shop domain");
        }
    }
}
