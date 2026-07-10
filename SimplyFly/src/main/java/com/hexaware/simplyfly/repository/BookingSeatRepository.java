package com.hexaware.simplyfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.simplyfly.entity.BookingSeat;

public interface BookingSeatRepository
        extends JpaRepository<BookingSeat, Integer> {

    List<BookingSeat> findByBookingBookingId(int bookingId);

    List<BookingSeat> findBySeatSeatId(int seatId);
}