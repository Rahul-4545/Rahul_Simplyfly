package com.hexaware.simplyfly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.hexaware.simplyfly.dto.BookingDTO;
import com.hexaware.simplyfly.entity.Booking;
import com.hexaware.simplyfly.service.IBookingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookings")
@Validated
public class BookingController {

    @Autowired
    private IBookingService service;

    @PostMapping("/add")
    public Booking addBooking(
            @Valid @RequestBody BookingDTO dto) {

        return service.addBooking(dto);
    }

    @PutMapping("/update")
    public Booking updateBooking(
            @Valid @RequestBody BookingDTO dto) {

        return service.updateBooking(dto);
    }

    @GetMapping("/getall")
    public List<Booking> getAllBookings() {

        return service.getAllBookings();
    }

    @GetMapping("/getbyid/{id}")
    public BookingDTO getById(
            @PathVariable int id) {

        return service.getBookingById(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBooking(
            @PathVariable int id) {

        service.deleteBooking(id);

        return new ResponseEntity<>(
                "Booking Deleted Successfully",
                HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public List<Booking> getByStatus(
            @PathVariable String status) {

        return service.getByStatus(status);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getByUser(
            @PathVariable int userId) {

        return service.getByUserId(userId);
    }

    @GetMapping("/flight/{flightId}")
    public List<Booking> getByFlight(
            @PathVariable int flightId) {

        return service.getByFlightId(flightId);
    }

    @GetMapping("/amount/{amount}")
    public List<Booking> getAmountGreaterThan(
            @PathVariable double amount) {

        return service.getAmountGreaterThan(amount);
    }

    @GetMapping("/amountdesc")
    public List<Booking> amountDesc() {

        return service.getBookingsAmountDesc();
    }
    @GetMapping("/owner/{ownerId}")
    public List<Booking> getBookingsByOwner(

            @PathVariable int ownerId){

        return service.getBookingsByOwner(ownerId);

    }
    @GetMapping("/exists/{userId}/{flightId}")
    public boolean bookingExists(

            @PathVariable int userId,

            @PathVariable int flightId){

        return service.bookingExists(

                userId,

                flightId);

    }

}