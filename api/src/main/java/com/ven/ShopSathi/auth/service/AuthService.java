package com.ven.ShopSathi.auth.service;

import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ven.ShopSathi.auth.dto.AuthRequest;
import com.ven.ShopSathi.auth.entity.User;
import com.ven.ShopSathi.auth.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JWTService jwtService;
    private final GoogleAuthService googleAuthService;

    public String signup(AuthRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .companyName(request.getCompanyName())
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        return jwtService.generateToken(user.getEmail());
    }

    public String login(AuthRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getPassword() == null) {
            throw new RuntimeException("This account uses Google sign-in. Please use Sign in with Google.");
        }
        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(user.getEmail());
    }

    /**
     * Login or signup with Google ID token. Creates user if not exists (no password).
     * Returns token and email for the response.
     */
    public GoogleLoginResult loginWithGoogle(String idToken) {
        String email = googleAuthService.verifyAndGetEmail(idToken);
        if (email == null || email.isBlank()) {
            throw new RuntimeException("Invalid Google token");
        }

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(email)
                    .password(null)
                    .companyName(null)
                    .createdAt(LocalDateTime.now())
                    .build();
            return userRepository.save(newUser);
        });

        String token = jwtService.generateToken(user.getEmail());
        return new GoogleLoginResult(token, user.getEmail());
    }

    public record GoogleLoginResult(String token, String email) {}
}
