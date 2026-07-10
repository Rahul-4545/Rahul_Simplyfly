package com.hexaware.simplyfly.service;

import java.util.List;

import com.hexaware.simplyfly.dto.BookingDTO;
import com.hexaware.simplyfly.entity.Booking;

public interface IBookingService {

    Booking addBooking(BookingDTO dto);

    Booking updateBooking(BookingDTO dto);

    BookingDTO getBookingById(int bookingId);

    List<Booking> getAllBookings();

    void deleteBooking(int bookingId);

    List<Booking> getByStatus(String status);

    List<Booking> getByUserId(int userId);

    List<Booking> getByFlightId(int flightId);

    List<Booking> getAmountGreaterThan(double amount);

    List<Booking> getBookingsAmountDesc();
    
    List<Booking> getBookingsByStatusNative(
            String status);
    List<Booking> getBookingsByOwner(int ownerId);
    boolean bookingExists(int userId, int flightId);

}