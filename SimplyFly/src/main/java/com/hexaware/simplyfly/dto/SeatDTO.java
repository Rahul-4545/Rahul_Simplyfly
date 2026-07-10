package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatDTO {

    private int seatId;

    @Positive
    private int flightId;

    @NotBlank
    private String seatNumber;

    @NotBlank
    private String seatStatus;
}