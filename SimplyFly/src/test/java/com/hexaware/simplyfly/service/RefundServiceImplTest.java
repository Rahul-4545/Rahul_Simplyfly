package com.hexaware.simplyfly.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hexaware.simplyfly.dto.RefundDTO;
import com.hexaware.simplyfly.entity.Booking;
import com.hexaware.simplyfly.entity.Refund;
import com.hexaware.simplyfly.repository.BookingRepository;
import com.hexaware.simplyfly.repository.RefundRepository;

@ExtendWith(MockitoExtension.class)
public class RefundServiceImplTest {

    @Mock
    private RefundRepository repo;

    @Mock
    private BookingRepository bookingRepo;

    @InjectMocks
    private RefundServiceImpl service;

    @Test
    void testAddRefund() {

        RefundDTO dto = new RefundDTO();

        dto.setBookingId(1);
        dto.setRefundAmount(1000);

        Booking booking = new Booking();
        booking.setBookingId(1);

        Refund refund = new Refund();

        when(bookingRepo.findById(1))
                .thenReturn(Optional.of(booking));

        when(repo.save(org.mockito.ArgumentMatchers.any()))
                .thenReturn(refund);

        assertNotNull(service.addRefund(dto));
    }
}