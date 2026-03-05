package com.ven.ShopSathi.auth.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleAuthService {

    private final GoogleIdTokenVerifier verifier;

    public GoogleAuthService(@Value("${google.client-id:}") String clientId) {
        String id = (clientId != null && !clientId.isBlank()) ? clientId : "placeholder";
        this.verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(id))
                .build();
    }

    /**
     * Verifies the Google ID token and returns the user's email, or null if invalid.
     */
    public String verifyAndGetEmail(String idToken) {
        if (idToken == null || idToken.isBlank()) {
            return null;
        }
        try {
            GoogleIdToken token = verifier.verify(idToken);
            if (token == null) {
                return null;
            }
            GoogleIdToken.Payload payload = token.getPayload();
            return payload.getEmail();
        } catch (Exception e) {
            return null;
        }
    }
}
