package com.hexaware.simplyfly.dto;
import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightDTO {

    private int flightId;

    @NotBlank(message = "Flight Name Required")
    private String flightName;

    @NotBlank(message = "Flight Number Required")
    private String flightNumber;

    @NotBlank(message = "Origin Required")
    private String origin;

    @NotBlank(message = "Destination Required")
    private String destination;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    @Positive(message = "Fare must be positive")
    private double fare;

    private int totalSeats;

    private int availableSeats;

    private int baggageCheckin;

    private int baggageCabin;

    private int ownerId;

}