package com.ven.ShopSathi.auth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http

            // ✅ CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // ✅ CSRF OFF (required for APIs + Shopify OAuth)
            .csrf(csrf -> csrf.disable())

            // ✅ No sessions (JWT app)
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // ✅ Disable default login
            .httpBasic(basic -> basic.disable())
            .formLogin(form -> form.disable())

            // ✅ ROUTE SECURITY
            .authorizeHttpRequests(auth -> auth

                    // 🔥 PUBLIC ROUTES (NO LOGIN NEEDED)

                    // Auth
                    .requestMatchers("/auth/**").permitAll()

                    // Shopify OAuth
                    .requestMatchers("/api/integrations/shopify/connect").permitAll()
                    .requestMatchers("/api/integrations/shopify/callback").permitAll()

                    // Shopify webhooks
                    .requestMatchers("/api/webhooks/**").permitAll()

                    // Swagger (optional)
                    .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()

                    // 🔒 EVERYTHING ELSE NEEDS LOGIN
                    .anyRequest().authenticated()
            );

        return http.build();
    }

    // PASSWORD ENCODER
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // REST TEMPLATE (for Shopify OAuth)
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    // CORS CONFIG (FRONTEND + SHOPIFY)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
                "https://stockguard-theta.vercel.app",          // React
                "https://admin.shopify.com",      // Shopify admin
                "https://*.myshopify.com"         // Shopify stores
        ));

        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));

        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}