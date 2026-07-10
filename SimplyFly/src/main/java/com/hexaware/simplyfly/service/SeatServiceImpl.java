package com.hexaware.simplyfly.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.simplyfly.dto.SeatDTO;
import com.hexaware.simplyfly.entity.Seat;
import com.hexaware.simplyfly.exception.ResourceNotFoundException;
import com.hexaware.simplyfly.repository.SeatRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SeatServiceImpl implements ISeatService {

    @Autowired
    private SeatRepository repo;

    @Override
    public Seat addSeat(SeatDTO dto) {

        log.info("Adding Seat : {}", dto.getSeatNumber());

        Seat seat = new Seat();

        seat.setFlightId(dto.getFlightId());
        seat.setSeatNumber(dto.getSeatNumber());
        seat.setSeatStatus(dto.getSeatStatus());

        Seat savedSeat = repo.save(seat);

        log.info("Seat Added Successfully with ID : {}",
                savedSeat.getSeatId());

        return savedSeat;
    }

    @Override
    public Seat updateSeat(SeatDTO dto) {

        log.info("Updating Seat : {}", dto.getSeatId());

        Seat existingSeat = repo.findById(dto.getSeatId())
                .orElseThrow(() -> {

                    log.error("Seat Not Found : {}",
                            dto.getSeatId());

                    return new ResourceNotFoundException(
                            "Seat Not Found : " + dto.getSeatId());
                });

        existingSeat.setFlightId(dto.getFlightId());
        existingSeat.setSeatNumber(dto.getSeatNumber());
        existingSeat.setSeatStatus(dto.getSeatStatus());

        Seat updatedSeat = repo.save(existingSeat);

        log.info("Seat Updated Successfully : {}",
                updatedSeat.getSeatId());

        return updatedSeat;
    }

    @Override
    public SeatDTO getSeatById(int seatId) {

        log.info("Fetching Seat By ID : {}", seatId);

        Seat seat = repo.findById(seatId)
                .orElseThrow(() -> {

                    log.error("Seat Not Found : {}", seatId);

                    return new ResourceNotFoundException(
                            "Seat Not Found : " + seatId);
                });

        SeatDTO dto = new SeatDTO();

        dto.setSeatId(seat.getSeatId());
        dto.setFlightId(seat.getFlightId());
        dto.setSeatNumber(seat.getSeatNumber());
        dto.setSeatStatus(seat.getSeatStatus());

        log.info("Seat Found : {}", seatId);

        return dto;
    }

    @Override
    public List<Seat> getAllSeats() {

        log.info("Fetching All Seats");

        return repo.findAll();
    }

    @Override
    public void deleteSeat(int seatId) {

        log.warn("Deleting Seat : {}", seatId);

        Seat seat = repo.findById(seatId)
                .orElseThrow(() -> {

                    log.error("Seat Not Found : {}", seatId);

                    return new ResourceNotFoundException(
                            "Seat Not Found : " + seatId);
                });

        repo.delete(seat);

        log.warn("Seat Deleted : {}", seatId);
    }

    @Override
    public List<Seat> getByFlightId(int flightId) {

        log.info("Fetching Seats For Flight : {}", flightId);

        return repo.findByFlightId(flightId);
    }

    @Override
    public List<Seat> getBySeatStatus(String seatStatus) {

        log.info("Fetching Seats By Status : {}",
                seatStatus);

        return repo.findBySeatStatus(seatStatus);
    }

    @Override
    public List<Seat> getSeatContaining(String seatNumber) {

        log.info("Searching Seats Containing : {}",
                seatNumber);

        return repo.findBySeatNumberContaining(seatNumber);
    }

    @Override
    public List<Seat> getByFlightAndStatus(
            int flightId,
            String seatStatus) {

        log.info(
                "Fetching Seats For Flight {} With Status {}",
                flightId,
                seatStatus);

        return repo.findByFlightIdAndSeatStatus(
                flightId,
                seatStatus);
    }
    @Override
    public String bookSeat(int seatId) {

        log.info("Booking Seat Using DML Query : {}",
                seatId);

        Seat seat = repo.findById(seatId)
                .orElseThrow(() -> {

                    log.error("Seat Not Found : {}",
                            seatId);

                    return new ResourceNotFoundException(
                            "Seat Not Found : " + seatId);
                });

        repo.bookSeat(seatId);

        log.info("Seat Status Updated To BOOKED : {}",
                seatId);

        return "Seat Booked Successfully";
    }
}