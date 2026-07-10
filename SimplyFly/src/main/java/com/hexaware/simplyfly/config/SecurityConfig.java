package com.hexaware.simplyfly.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hexaware.simplyfly.security.JwtAuthFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

            // Disable CSRF
            .csrf(csrf -> csrf.disable())

            // Enable CORS
            .cors(Customizer.withDefaults())

            // Stateless JWT
            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth

                // ===========================
                // Authentication
                // ===========================

                .requestMatchers(
                        "/auth/**",
                        "/api/users/add"
                ).permitAll()

                // ===========================
                // Public Flight APIs
                // ===========================

                .requestMatchers(
                        "/api/flights/getall",
                        "/api/flights/getbyid/**",
                        "/api/flights/search/**",
                        "/api/flights/origin/**",
                        "/api/flights/destination/**",
                        "/api/flights/fare/**",
                        "/api/flights/name/**",
                        "/api/flights/fareasc",
                        "/api/flights/faredesc",
                        "/api/flights/jpql/**",
                        "/api/flights/named/**"
                ).permitAll()

                // ===========================
                // Admin Only
                // ===========================

                .requestMatchers("/api/users/**")
                .hasRole("ADMIN")

                // ===========================
                // Refund APIs
                // ===========================

                .requestMatchers("/api/refunds/**")
                .hasAnyRole(
                        "ADMIN",
                        "USER",
                        "FLIGHT_OWNER"
                )
                // ===========================
                // Flight Owner
                // ===========================

                .requestMatchers(
                        "/api/flights/add",
                        "/api/flights/update",
                        "/api/flights/delete/**",
                        "/api/seats/**"
                ).hasAnyRole("ADMIN", "FLIGHT_OWNER")

                // ===========================
                // Booking APIs
                // ===========================

                .requestMatchers("/api/bookings/**")
                .hasAnyRole("ADMIN", "USER", "FLIGHT_OWNER")

                // ===========================
                // Payment APIs
                // ===========================

                .requestMatchers("/api/payments/**")
                .hasAnyRole("ADMIN", "USER", "FLIGHT_OWNER")

                // ===========================
                // Everything Else
                // ===========================

                .anyRequest()
                .authenticated()

            )

            // JWT Filter
            .addFilterBefore(
                    jwtAuthFilter,
                    UsernamePasswordAuthenticationFilter.class)

            // Disable HTTP Basic
            .httpBasic(httpBasic -> httpBasic.disable());

        return http.build();

    }

}