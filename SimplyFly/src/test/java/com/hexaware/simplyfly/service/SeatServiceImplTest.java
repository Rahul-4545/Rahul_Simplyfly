package com.hexaware.simplyfly.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hexaware.simplyfly.entity.Seat;
import com.hexaware.simplyfly.repository.SeatRepository;

@ExtendWith(MockitoExtension.class)
public class SeatServiceImplTest {

    @Mock
    private SeatRepository repo;

    @InjectMocks
    private SeatServiceImpl service;

    @Test
    void testGetSeatById() {

        Seat seat = new Seat();

        seat.setSeatId(1);
        seat.setSeatNumber("A1");

        when(repo.findById(1))
                .thenReturn(Optional.of(seat));

        assertNotNull(service.getSeatById(1));
    }
}