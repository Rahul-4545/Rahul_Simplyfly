package com.hexaware.simplyfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hexaware.simplyfly.entity.Booking;

@Repository
public interface BookingRepository
        extends JpaRepository<Booking, Integer> {

    List<Booking> findByBookingStatus(String bookingStatus);

    List<Booking> findByUserUserId(int userId);

    List<Booking> findByFlightFlightId(int flightId);

    List<Booking> findByTotalAmountGreaterThan(double amount);

    List<Booking> findByOrderByTotalAmountDesc();

    // Native Query
    @Query(
            value = "select * from bookings where booking_status = ?1",
            nativeQuery = true
    )
    List<Booking> getBookingsByStatusNative(String status);

    // JPQL Query
    @Query(
            "select b from Booking b where b.flight.ownerId = :ownerId"
    )
    List<Booking> getBookingsByOwner(
            @Param("ownerId") int ownerId);
    boolean existsByUserUserIdAndFlightFlightIdAndBookingStatus(
            int userId,
            int flightId,
            String bookingStatus
    );

}