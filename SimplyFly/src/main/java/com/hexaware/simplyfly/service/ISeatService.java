package com.hexaware.simplyfly.service;

import java.util.List;

import com.hexaware.simplyfly.dto.SeatDTO;
import com.hexaware.simplyfly.entity.Seat;

public interface ISeatService {

    Seat addSeat(SeatDTO dto);

    Seat updateSeat(SeatDTO dto);

    SeatDTO getSeatById(int seatId);

    List<Seat> getAllSeats();

    void deleteSeat(int seatId);

    List<Seat> getByFlightId(int flightId);

    List<Seat> getBySeatStatus(String seatStatus);

    List<Seat> getSeatContaining(String seatNumber);

    List<Seat> getByFlightAndStatus(
            int flightId,
            String seatStatus);

    // DML Query

    String bookSeat(int seatId);
}