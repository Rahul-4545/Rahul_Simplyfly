package com.hexaware.simplyfly.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "booking_seats")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingSeatId;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;
}