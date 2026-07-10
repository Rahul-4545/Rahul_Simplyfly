package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefundDTO {

    private int refundId;

    @Positive
    private int bookingId;

    @Positive
    private double refundAmount;

    @NotBlank
    private String refundStatus;

    @NotBlank
    private String refundDate;
}