package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ForgotPasswordDTO {

    @Email(message = "Invalid Email")
    private String email;

    @NotBlank(message = "Password is required")
    private String newPassword;

}