package com.hexaware.simplyfly.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "flights")

@NamedQuery(
        name = "Flight.findByDestinationNamed",
        query = "select f from Flight f where f.destination = :destination"
)

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int flightId;

    private String flightName;

    @Column(unique = true)
    private String flightNumber;

    private String origin;

    private String destination;

    private LocalDateTime departureTime;

    private LocalDateTime arrivalTime;

    private double fare;

    private int totalSeats;

    private int availableSeats;

    private int baggageCheckin;

    private int baggageCabin;

    private int ownerId;

}