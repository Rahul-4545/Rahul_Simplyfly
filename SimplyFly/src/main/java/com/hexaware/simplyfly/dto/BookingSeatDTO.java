package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.Positive;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingSeatDTO {

    private int bookingSeatId;

    @Positive
    private int bookingId;

    @Positive
    private int seatId;
}