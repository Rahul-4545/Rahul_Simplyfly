package com.hexaware.simplyfly.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="seats")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seatId;

    private int flightId;

    private String seatNumber;

    private String seatStatus;
}