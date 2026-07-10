package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

    private int paymentId;

    @Positive
    private int bookingId;

    @Positive
    private double amount;

    @NotBlank
    private String paymentMethod;

    @NotBlank
    private String paymentStatus;

    @NotBlank
    private String paymentDate;
}