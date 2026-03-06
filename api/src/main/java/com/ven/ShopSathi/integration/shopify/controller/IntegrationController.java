package com.ven.ShopSathi.integration.shopify.controller;

import com.ven.ShopSathi.integration.shopify.auth.ShopifyOAuthService;
import com.ven.ShopSathi.integration.shopify.security.ShopifyHmacValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/integrations/shopify")
@RequiredArgsConstructor
public class IntegrationController {

    private final ShopifyOAuthService oAuthService;
    private final ShopifyHmacValidator hmacValidator;

    @Value("${shopify.api.key}")
    private String shopifyApiKey;

    @Value("${shopify.redirect.uri}")
    private String redirectUri;

    @Value("${shopify.scopes}")
    private String scopes;

    @Value("${app.frontend.url:https://stockguard-theta.vercel.app}")
    private String frontendUrl;

    // ENTRY POINT: Shopify App Installation
    @GetMapping("/")
    public RedirectView entry(@RequestParam(required = false) String shop) {
        
        if (shop == null || shop.isEmpty()) {
            return new RedirectView(frontendUrl);
        }

        String normalizedShop = normalizeShopDomain(shop);
        if (normalizedShop == null) {
            return new RedirectView(frontendUrl + "/error?message=invalid_shop");
        }

        String encodedShop = URLEncoder.encode(normalizedShop, StandardCharsets.UTF_8);
        return new RedirectView(frontendUrl + "/install?shop=" + encodedShop);
    }

    private String normalizeShopDomain(String shop) {
        if (shop == null) return null;
        
        // Remove protocol if present
        shop = shop.replaceFirst("^https?://", "");
        
        // Remove trailing slash
        shop = shop.replaceFirst("/$", "");
        
        // Add .myshopify.com if missing
        if (!shop.contains(".")) {
            shop += ".myshopify.com";
        }
        
        return shop.endsWith(".myshopify.com") ? shop : null;
    }

    // STEP 1: CONNECT
    @GetMapping("/connect")
    public RedirectView connect(@RequestParam String shop,
    @RequestParam Long userId) {

        validateShop(shop);

        String state = userId.toString();

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

    // STEP 2: CALLBACK
    @GetMapping("/callback")
    public RedirectView callback(@RequestParam Map<String, String> params) {

        if (!hmacValidator.isValidHmac(params)) {
            throw new IllegalStateException("Invalid HMAC");
        }

        String state = params.get("state");
        String shop = params.get("shop");
        String code = params.get("code");

        // SAFE CHECK (MOST IMPORTANT)
        if (state == null || state.isBlank()) {
            throw new IllegalStateException("State missing from Shopify callback");
        }

        if (code == null || code.isBlank()) {
            throw new IllegalStateException("Authorization code missing from Shopify callback");
        }

        Long userId;
        try {
            userId = Long.valueOf(state);
        } catch (Exception e) {
            throw new IllegalStateException("Invalid state value");
        }

        validateShop(shop);

        oAuthService.exchangeCodeForToken(shop, code, userId);

        return new RedirectView(frontendUrl + "/shopify-success?shop=" + shop);
    }

    private void validateShop(String shop) {
        if (shop == null || !shop.endsWith(".myshopify.com")) {
            throw new IllegalArgumentException("Invalid shop domain");
        }
    }
}
