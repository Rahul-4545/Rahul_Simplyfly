package com.hexaware.simplyfly.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hexaware.simplyfly.dto.BookingDTO;
import com.hexaware.simplyfly.exception.ResourceNotFoundException;
import com.hexaware.simplyfly.repository.BookingRepository;
import com.hexaware.simplyfly.repository.FlightRepository;
import com.hexaware.simplyfly.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class BookingServiceImplTest {

    @Mock
    private BookingRepository bookingRepo;

    @Mock
    private UserRepository userRepo;

    @Mock
    private FlightRepository flightRepo;

    @InjectMocks
    private BookingServiceImpl service;

    @Test
    void testUserNotFound() {

        BookingDTO dto = new BookingDTO();

        dto.setUserId(100);
        dto.setFlightId(1);
        dto.setBookingDate("2026-06-21");
        dto.setTotalAmount(5000);
        dto.setBookingStatus("CONFIRMED");

        when(userRepo.findById(100))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> service.addBooking(dto));
    }
}