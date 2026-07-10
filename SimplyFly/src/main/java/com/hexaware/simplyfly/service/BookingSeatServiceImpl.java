package com.hexaware.simplyfly.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.simplyfly.dto.BookingSeatDTO;
import com.hexaware.simplyfly.entity.Booking;
import com.hexaware.simplyfly.entity.BookingSeat;
import com.hexaware.simplyfly.entity.Seat;
import com.hexaware.simplyfly.exception.ResourceNotFoundException;
import com.hexaware.simplyfly.exception.SeatAlreadyBookedException;
import com.hexaware.simplyfly.repository.BookingRepository;
import com.hexaware.simplyfly.repository.BookingSeatRepository;
import com.hexaware.simplyfly.repository.SeatRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BookingSeatServiceImpl implements IBookingSeatService {

    @Autowired
    private BookingSeatRepository repo;

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private SeatRepository seatRepo;

    @Override
    public BookingSeat addBookingSeat(BookingSeatDTO dto) {

        log.info("Assigning Seat {} To Booking {}",
                dto.getSeatId(),
                dto.getBookingId());

        Booking booking =
                bookingRepo.findById(dto.getBookingId())
                .orElseThrow(() -> {

                    log.error("Booking Not Found : {}",
                            dto.getBookingId());

                    return new ResourceNotFoundException(
                            "Booking Not Found : "
                            + dto.getBookingId());
                });

        Seat seat =
                seatRepo.findById(dto.getSeatId())
                .orElseThrow(() -> {

                    log.error("Seat Not Found : {}",
                            dto.getSeatId());

                    return new ResourceNotFoundException(
                            "Seat Not Found : "
                            + dto.getSeatId());
                });

        if (seat.getSeatStatus()
                .equalsIgnoreCase("BOOKED")) {

            log.error("Seat Already Booked : {}",
                    dto.getSeatId());

            throw new SeatAlreadyBookedException(
                    "Seat already booked");
        }

        BookingSeat bs = new BookingSeat();

        bs.setBooking(booking);
        bs.setSeat(seat);

        BookingSeat savedBookingSeat = repo.save(bs);

        log.info("Booking Seat Created Successfully : {}",
                savedBookingSeat.getBookingSeatId());
        seat.setSeatStatus("BOOKED");

        seatRepo.save(seat);

        return savedBookingSeat;
    }

    @Override
    public BookingSeat updateBookingSeat(BookingSeatDTO dto) {

        log.info("Updating Booking Seat : {}",
                dto.getBookingSeatId());

        BookingSeat existingBookingSeat =
                repo.findById(dto.getBookingSeatId())
                .orElseThrow(() -> {

                    log.error("Booking Seat Not Found : {}",
                            dto.getBookingSeatId());

                    return new ResourceNotFoundException(
                            "Booking Seat Not Found : "
                            + dto.getBookingSeatId());
                });

        Booking booking =
                bookingRepo.findById(dto.getBookingId())
                .orElseThrow(() -> {

                    log.error("Booking Not Found : {}",
                            dto.getBookingId());

                    return new ResourceNotFoundException(
                            "Booking Not Found : "
                            + dto.getBookingId());
                });

        Seat seat =
                seatRepo.findById(dto.getSeatId())
                .orElseThrow(() -> {

                    log.error("Seat Not Found : {}",
                            dto.getSeatId());

                    return new ResourceNotFoundException(
                            "Seat Not Found : "
                            + dto.getSeatId());
                });

        if (seat.getSeatStatus()
                .equalsIgnoreCase("BOOKED")) {

            log.error("Seat Already Booked : {}",
                    dto.getSeatId());

            throw new SeatAlreadyBookedException(
                    "Seat already booked");
        }

        existingBookingSeat.setBooking(booking);
        existingBookingSeat.setSeat(seat);

        BookingSeat updatedBookingSeat =
                repo.save(existingBookingSeat);

        log.info("Booking Seat Updated Successfully : {}",
                updatedBookingSeat.getBookingSeatId());

        return updatedBookingSeat;
    }

    @Override
    public BookingSeatDTO getById(int bookingSeatId) {

        log.info("Fetching Booking Seat By ID : {}",
                bookingSeatId);

        BookingSeat bs =
                repo.findById(bookingSeatId)
                .orElseThrow(() -> {

                    log.error("Booking Seat Not Found : {}",
                            bookingSeatId);

                    return new ResourceNotFoundException(
                            "Booking Seat Not Found : "
                            + bookingSeatId);
                });

        BookingSeatDTO dto = new BookingSeatDTO();

        dto.setBookingSeatId(bs.getBookingSeatId());
        dto.setBookingId(bs.getBooking().getBookingId());
        dto.setSeatId(bs.getSeat().getSeatId());

        log.info("Booking Seat Found : {}",
                bookingSeatId);

        return dto;
    }

    @Override
    public List<BookingSeat> getAll() {

        log.info("Fetching All Booking Seats");

        return repo.findAll();
    }

    @Override
    public void deleteById(int bookingSeatId) {

        log.warn("Deleting Booking Seat : {}",
                bookingSeatId);

        BookingSeat bs =
                repo.findById(bookingSeatId)
                .orElseThrow(() -> {

                    log.error("Booking Seat Not Found : {}",
                            bookingSeatId);

                    return new ResourceNotFoundException(
                            "Booking Seat Not Found : "
                            + bookingSeatId);
                });

        repo.delete(bs);

        log.warn("Booking Seat Deleted : {}",
                bookingSeatId);
    }

    @Override
    public List<BookingSeat> getByBookingId(int bookingId) {

        log.info("Fetching Booking Seats For Booking : {}",
                bookingId);

        return repo.findByBookingBookingId(bookingId);
    }

    @Override
    public List<BookingSeat> getBySeatId(int seatId) {

        log.info("Fetching Booking Seats For Seat : {}",
                seatId);

        return repo.findBySeatSeatId(seatId);
    }

}