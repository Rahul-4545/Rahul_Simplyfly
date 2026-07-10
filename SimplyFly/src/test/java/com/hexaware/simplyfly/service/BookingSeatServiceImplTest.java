package com.hexaware.simplyfly.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hexaware.simplyfly.dto.BookingSeatDTO;
import com.hexaware.simplyfly.entity.Booking;
import com.hexaware.simplyfly.entity.Seat;
import com.hexaware.simplyfly.exception.SeatAlreadyBookedException;
import com.hexaware.simplyfly.repository.BookingRepository;
import com.hexaware.simplyfly.repository.BookingSeatRepository;
import com.hexaware.simplyfly.repository.SeatRepository;

@ExtendWith(MockitoExtension.class)
public class BookingSeatServiceImplTest {

    @Mock
    private BookingSeatRepository repo;

    @Mock
    private BookingRepository bookingRepo;

    @Mock
    private SeatRepository seatRepo;

    @InjectMocks
    private BookingSeatServiceImpl service;

    @Test
    void testSeatAlreadyBooked() {

        BookingSeatDTO dto = new BookingSeatDTO();

        dto.setBookingId(1);
        dto.setSeatId(1);

        Booking booking = new Booking();
        booking.setBookingId(1);

        Seat seat = new Seat();
        seat.setSeatId(1);
        seat.setSeatStatus("BOOKED");

        when(bookingRepo.findById(1))
                .thenReturn(Optional.of(booking));

        when(seatRepo.findById(1))
                .thenReturn(Optional.of(seat));

        assertThrows(
                SeatAlreadyBookedException.class,
                () -> service.addBookingSeat(dto));
    }
}