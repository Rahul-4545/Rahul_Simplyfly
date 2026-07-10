package com.hexaware.simplyfly.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "refunds")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Refund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int refundId;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    private double refundAmount;

    private String refundStatus;

    private String refundDate;
}