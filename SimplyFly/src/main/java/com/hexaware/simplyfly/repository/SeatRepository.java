package com.hexaware.simplyfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.simplyfly.entity.Seat;

@Repository
public interface SeatRepository
        extends JpaRepository<Seat, Integer> {

    List<Seat> findByFlightId(int flightId);

    List<Seat> findBySeatStatus(String seatStatus);

    List<Seat> findBySeatNumberContaining(String seatNumber);

    List<Seat> findByFlightIdAndSeatStatus(
            int flightId,
            String seatStatus);

    // DML Query

    @Modifying
    @Transactional
    @Query(
            value =
            "update seats set seat_status='BOOKED' where seat_id=?1",
            nativeQuery = true
    )
    int bookSeat(int seatId);

}