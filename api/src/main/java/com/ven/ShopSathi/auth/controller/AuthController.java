package com.ven.ShopSathi.auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ven.ShopSathi.auth.dto.AuthRequest;
import com.ven.ShopSathi.auth.dto.AuthResponse;
import com.ven.ShopSathi.auth.service.AuthService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    
    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody AuthRequest request){
        String token = authService.signup(request);
        return new AuthResponse(token, request.getEmail());
    }
  
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request)
    {
        String token = authService.login(request);
        return new AuthResponse(token, request.getEmail());
    }

    @PostMapping("/google")
    public AuthResponse loginWithGoogle(@RequestBody GoogleLoginRequest request) {
        AuthService.GoogleLoginResult result = authService.loginWithGoogle(request.getCredential());
        return new AuthResponse(result.token(), result.email());
    }

    public static class GoogleLoginRequest {
        private String credential; // Google ID token from "Sign in with Google"

        public String getCredential() {
            return credential;
        }

        public void setCredential(String credential) {
            this.credential = credential;
        }
    }
}
