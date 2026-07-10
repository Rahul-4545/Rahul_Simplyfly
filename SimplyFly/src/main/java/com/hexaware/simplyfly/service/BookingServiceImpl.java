package com.hexaware.simplyfly.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.simplyfly.dto.BookingDTO;
import com.hexaware.simplyfly.entity.Booking;
import com.hexaware.simplyfly.entity.Flight;
import com.hexaware.simplyfly.entity.User;
import com.hexaware.simplyfly.exception.FlightNotAvailableException;
import com.hexaware.simplyfly.exception.InvalidTravelDateException;
import com.hexaware.simplyfly.exception.ResourceNotFoundException;
import com.hexaware.simplyfly.repository.BookingRepository;
import com.hexaware.simplyfly.repository.FlightRepository;
import com.hexaware.simplyfly.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BookingServiceImpl implements IBookingService {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private FlightRepository flightRepo;

    @Override
    public Booking addBooking(BookingDTO dto) {

        log.info("Creating Booking For User {} Flight {}",
                dto.getUserId(),
                dto.getFlightId());

        User user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> {

                    log.error("User Not Found : {}",
                            dto.getUserId());

                    return new ResourceNotFoundException(
                            "User Not Found : " + dto.getUserId());
                });

        Flight flight = flightRepo.findById(dto.getFlightId())
                .orElseThrow(() -> {

                    log.error("Flight Not Found : {}",
                            dto.getFlightId());

                    return new ResourceNotFoundException(
                            "Flight Not Found : " + dto.getFlightId());
                });

        if (flight.getAvailableSeats() <= 0) {

            log.error("No Seats Available For Flight : {}",
                    dto.getFlightId());

            throw new FlightNotAvailableException(
                    "No seats available for this flight");
        }

        LocalDateTime now = LocalDateTime.now();

        if (!flight.getDepartureTime().isAfter(now)) {

            log.error("Past Date Booking Attempt For Flight : {}",
                    dto.getFlightId());

            throw new InvalidTravelDateException(
                    "Cannot book flight for a past departure date");

        }

        Booking booking = new Booking();

        booking.setUser(user);
        booking.setFlight(flight);
        booking.setBookingDate(dto.getBookingDate());
        booking.setTotalAmount(dto.getTotalAmount());
        booking.setBookingStatus(dto.getBookingStatus());

        Booking savedBooking = bookingRepo.save(booking);
        
        flight.setAvailableSeats(

                flight.getAvailableSeats() - 1

        );

        flightRepo.save(flight);

        log.info("Booking Created Successfully : {}",
                savedBooking.getBookingId());

        return savedBooking;
    }

    @Override
    public Booking updateBooking(BookingDTO dto) {

        log.info("Updating Booking : {}",
                dto.getBookingId());

        Booking existingBooking =
                bookingRepo.findById(dto.getBookingId())
                .orElseThrow(() -> {

                    log.error("Booking Not Found : {}",
                            dto.getBookingId());

                    return new ResourceNotFoundException(
                            "Booking Not Found : " + dto.getBookingId());
                });

        User user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> {

                    log.error("User Not Found : {}",
                            dto.getUserId());

                    return new ResourceNotFoundException(
                            "User Not Found : " + dto.getUserId());
                });

        Flight flight = flightRepo.findById(dto.getFlightId())
                .orElseThrow(() -> {

                    log.error("Flight Not Found : {}",
                            dto.getFlightId());

                    return new ResourceNotFoundException(
                            "Flight Not Found : " + dto.getFlightId());
                });

        if (flight.getAvailableSeats() <= 0) {

            log.error("No Seats Available For Flight : {}",
                    dto.getFlightId());

            throw new FlightNotAvailableException(
                    "No seats available for this flight");
        }

        LocalDateTime now = LocalDateTime.now();

        if (!flight.getDepartureTime().isAfter(now)) {

            log.error("Past Date Booking Attempt For Flight : {}",
                    dto.getFlightId());

            throw new InvalidTravelDateException(
                    "Cannot book flight for a past departure date");

        }
        existingBooking.setUser(user);
        existingBooking.setFlight(flight);
        existingBooking.setBookingDate(dto.getBookingDate());
        existingBooking.setTotalAmount(dto.getTotalAmount());
        existingBooking.setBookingStatus(dto.getBookingStatus());

        Booking updatedBooking =
                bookingRepo.save(existingBooking);

        log.info("Booking Updated Successfully : {}",
                updatedBooking.getBookingId());

        return updatedBooking;
    }

    @Override
    public BookingDTO getBookingById(int bookingId) {

        log.info("Fetching Booking By ID : {}",
                bookingId);

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> {

                    log.error("Booking Not Found : {}",
                            bookingId);

                    return new ResourceNotFoundException(
                            "Booking Not Found : " + bookingId);
                });

        BookingDTO dto = new BookingDTO();

        dto.setBookingId(booking.getBookingId());
        dto.setUserId(booking.getUser().getUserId());
        dto.setFlightId(booking.getFlight().getFlightId());
        dto.setBookingDate(booking.getBookingDate());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setBookingStatus(booking.getBookingStatus());

        log.info("Booking Found : {}",
                bookingId);

        return dto;
    }

    @Override
    public List<Booking> getAllBookings() {

        log.info("Fetching All Bookings");

        return bookingRepo.findAll();
    }

    @Override
    public void deleteBooking(int bookingId) {

        log.warn("Deleting Booking : {}",
                bookingId);

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> {

                    log.error("Booking Not Found : {}",
                            bookingId);

                    return new ResourceNotFoundException(
                            "Booking Not Found : " + bookingId);
                });

        bookingRepo.delete(booking);

        log.warn("Booking Deleted : {}",
                bookingId);
    }

    @Override
    public List<Booking> getByStatus(String status) {

        log.info("Fetching Bookings By Status : {}",
                status);

        return bookingRepo.findByBookingStatus(status);
    }

    @Override
    public List<Booking> getByUserId(int userId) {

        log.info("Fetching Bookings For User : {}",
                userId);

        return bookingRepo.findByUserUserId(userId);
    }

    @Override
    public List<Booking> getByFlightId(int flightId) {

        log.info("Fetching Bookings For Flight : {}",
                flightId);

        return bookingRepo.findByFlightFlightId(flightId);
    }

    @Override
    public List<Booking> getAmountGreaterThan(double amount) {

        log.info("Fetching Bookings Amount Greater Than : {}",
                amount);

        return bookingRepo.findByTotalAmountGreaterThan(amount);
    }

    @Override
    public List<Booking> getBookingsAmountDesc() {

        log.info("Fetching Bookings Ordered By Amount Desc");

        return bookingRepo.findByOrderByTotalAmountDesc();
    }
    
    @Override
    public List<Booking> getBookingsByStatusNative(
            String status) {

        log.info(
                "Native Query Search Booking Status : {}",
                status);

        return bookingRepo.getBookingsByStatusNative(
                status);
    }
    @Override
    public List<Booking> getBookingsByOwner(
            int ownerId) {

        log.info(
                "Fetching Bookings For Owner : {}",
                ownerId);

        return bookingRepo.getBookingsByOwner(ownerId);

    }
    @Override
    public boolean bookingExists(int userId, int flightId) {

    	return bookingRepo.existsByUserUserIdAndFlightFlightIdAndBookingStatus(

                userId,

                flightId,

                "CONFIRMED"

        );

    }
}