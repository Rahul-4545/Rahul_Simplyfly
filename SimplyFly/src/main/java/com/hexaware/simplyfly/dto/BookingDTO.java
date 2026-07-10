package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {

    private int bookingId;

    @Positive(message = "User Id must be positive")
    private int userId;

    @Positive(message = "Flight Id must be positive")
    private int flightId;

    @NotBlank(message = "Booking Date cannot be empty")
    private String bookingDate;

    @Positive(message = "Total Amount must be greater than 0")
    private double totalAmount;

    @NotBlank(message = "Booking Status cannot be empty")
    private String bookingStatus;

}