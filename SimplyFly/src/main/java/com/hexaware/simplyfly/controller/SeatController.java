package com.hexaware.simplyfly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.hexaware.simplyfly.dto.SeatDTO;
import com.hexaware.simplyfly.entity.Seat;
import com.hexaware.simplyfly.service.ISeatService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/seats")
@Validated
public class SeatController {

    @Autowired
    private ISeatService service;

    @PostMapping("/add")
    public Seat addSeat(
            @Valid @RequestBody SeatDTO dto) {

        return service.addSeat(dto);
    }

    @PutMapping("/update")
    public Seat updateSeat(
            @Valid @RequestBody SeatDTO dto) {

        return service.updateSeat(dto);
    }

    @GetMapping("/getbyid/{id}")
    public SeatDTO getSeatById(
            @PathVariable int id) {

        return service.getSeatById(id);
    }

    @GetMapping("/getall")
    public List<Seat> getAllSeats() {

        return service.getAllSeats();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSeat(
            @PathVariable int id) {

        service.deleteSeat(id);

        return new ResponseEntity<>(
                "Seat Deleted Successfully",
                HttpStatus.OK);
    }

    @GetMapping("/flight/{flightId}")
    public List<Seat> getByFlightId(
            @PathVariable int flightId) {

        return service.getByFlightId(flightId);
    }

    @GetMapping("/status/{status}")
    public List<Seat> getBySeatStatus(
            @PathVariable String status) {

        return service.getBySeatStatus(status);
    }

    @GetMapping("/number/{seatNumber}")
    public List<Seat> getSeatContaining(
            @PathVariable String seatNumber) {

        return service.getSeatContaining(seatNumber);
    }

    @GetMapping("/search/{flightId}/{status}")
    public List<Seat> getByFlightAndStatus(
            @PathVariable int flightId,
            @PathVariable String status) {

        return service.getByFlightAndStatus(
                flightId,
                status);
    }
    @PutMapping("/bookseat/{seatId}")
    public String bookSeat(
            @PathVariable int seatId){

        return service.bookSeat(seatId);
    }

}