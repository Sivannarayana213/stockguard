package com.ven.ShopSathi.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email; // optional; set for Google login so UI can display it
}
