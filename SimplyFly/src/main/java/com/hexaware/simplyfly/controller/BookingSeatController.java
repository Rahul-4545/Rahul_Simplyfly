package com.hexaware.simplyfly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.hexaware.simplyfly.dto.BookingSeatDTO;
import com.hexaware.simplyfly.entity.BookingSeat;
import com.hexaware.simplyfly.service.IBookingSeatService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookingseats")
@Validated
public class BookingSeatController {

    @Autowired
    private IBookingSeatService service;

    @PostMapping("/add")
    public BookingSeat addBookingSeat(
            @Valid @RequestBody BookingSeatDTO dto) {

        return service.addBookingSeat(dto);
    }

    @PutMapping("/update")
    public BookingSeat updateBookingSeat(
            @Valid @RequestBody BookingSeatDTO dto) {

        return service.updateBookingSeat(dto);
    }

    @GetMapping("/getall")
    public List<BookingSeat> getAll() {

        return service.getAll();
    }

    @GetMapping("/getbyid/{id}")
    public BookingSeatDTO getById(
            @PathVariable int id) {

        return service.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBookingSeat(
            @PathVariable int id) {

        service.deleteById(id);

        return new ResponseEntity<>(
                "Booking Seat Deleted Successfully",
                HttpStatus.OK);
    }

    @GetMapping("/booking/{bookingId}")
    public List<BookingSeat> getByBookingId(
            @PathVariable int bookingId) {

        return service.getByBookingId(bookingId);
    }

    @GetMapping("/seat/{seatId}")
    public List<BookingSeat> getBySeatId(
            @PathVariable int seatId) {

        return service.getBySeatId(seatId);
    }
}