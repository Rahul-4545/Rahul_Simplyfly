package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private int userId;

    @NotBlank(message="Name is required")
    private String name;

    @Email(message="Invalid Email")
    private String email;

    @NotBlank(message="Password is required")
    private String password;

    @Pattern(regexp="[0-9]{10}",
             message="Phone must contain 10 digits")
    private String phone;

    private String gender;

    private String role;

}