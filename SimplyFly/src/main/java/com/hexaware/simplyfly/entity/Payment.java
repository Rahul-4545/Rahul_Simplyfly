package com.hexaware.simplyfly.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    private double amount;

    private String paymentMethod;

    private String paymentStatus;

    private String paymentDate;
}