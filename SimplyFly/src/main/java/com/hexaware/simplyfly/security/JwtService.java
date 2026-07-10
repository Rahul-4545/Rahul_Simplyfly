package com.hexaware.simplyfly.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET =
            "SimplyFlyJwtSecretKeySimplyFlyJwtSecretKey12345";

    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET.getBytes(StandardCharsets.UTF_8));

    public String generateToken(String email, String role) {

        return Jwts.builder()

                .subject(email)

                .claim("role", role)

                .issuedAt(new Date())

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 86400000))

                .signWith(key)

                .compact();
    }

    public String extractEmail(String token) {

        return Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .getSubject();
    }

    public String extractRole(String token) {

        return Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .get("role", String.class);
    }

}