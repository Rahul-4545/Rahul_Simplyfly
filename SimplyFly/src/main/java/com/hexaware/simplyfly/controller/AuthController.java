package com.hexaware.simplyfly.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.hexaware.simplyfly.dto.LoginDTO;
import com.hexaware.simplyfly.dto.LoginResponseDTO;
import com.hexaware.simplyfly.entity.User;
import com.hexaware.simplyfly.repository.UserRepository;
import com.hexaware.simplyfly.security.JwtService;
import com.hexaware.simplyfly.dto.ForgotPasswordDTO;
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginDTO dto) {

        User user = userRepo.findByEmail(dto.getEmail());

        if (user == null) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("User Not Found");
        }

        boolean validPassword =
                passwordEncoder.matches(
                        dto.getPassword(),
                        user.getPassword());

        if (!validPassword) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Password");
        }

        String token =
                jwtService.generateToken(
                        user.getEmail(),
                        user.getRole());

        LoginResponseDTO response =
                new LoginResponseDTO();

        response.setUserId(user.getUserId());
        response.setToken(token);
        response.setRole(user.getRole());
        response.setEmail(user.getEmail());
        response.setName(user.getName());

        return ResponseEntity.ok(response);
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody ForgotPasswordDTO dto) {

        User user = userRepo.findByEmail(dto.getEmail());

        if (user == null) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Email not registered");

        }

        user.setPassword(

                passwordEncoder.encode(

                        dto.getNewPassword()

                )

        );

        userRepo.save(user);

        return ResponseEntity.ok(

                "Password Updated Successfully"

        );

    }

}