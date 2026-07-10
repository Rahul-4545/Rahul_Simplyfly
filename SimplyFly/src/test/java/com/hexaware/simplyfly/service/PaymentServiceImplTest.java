package com.hexaware.simplyfly.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hexaware.simplyfly.dto.PaymentDTO;
import com.hexaware.simplyfly.entity.Booking;
import com.hexaware.simplyfly.exception.PaymentFailedException;
import com.hexaware.simplyfly.repository.BookingRepository;
import com.hexaware.simplyfly.repository.PaymentRepository;

@ExtendWith(MockitoExtension.class)
public class PaymentServiceImplTest {

    @Mock
    private PaymentRepository repo;

    @Mock
    private BookingRepository bookingRepo;

    @InjectMocks
    private PaymentServiceImpl service;

    @Test
    void testPaymentFailed() {

        PaymentDTO dto = new PaymentDTO();

        dto.setBookingId(1);
        dto.setPaymentStatus("FAILED");

        Booking booking = new Booking();
        booking.setBookingId(1);

        when(bookingRepo.findById(1))
                .thenReturn(Optional.of(booking));

        assertThrows(
                PaymentFailedException.class,
                () -> service.addPayment(dto));
    }
}