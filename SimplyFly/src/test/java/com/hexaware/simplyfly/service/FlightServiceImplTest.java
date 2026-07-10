package com.hexaware.simplyfly.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hexaware.simplyfly.entity.Flight;
import com.hexaware.simplyfly.repository.FlightRepository;

@ExtendWith(MockitoExtension.class)
public class FlightServiceImplTest {

    @Mock
    private FlightRepository repo;

    @InjectMocks
    private FlightServiceImpl service;

    @Test
    void testGetFlightById() {

        Flight flight = new Flight();

        flight.setFlightId(1);
        flight.setFlightName("Indigo");

        when(repo.findById(1))
                .thenReturn(Optional.of(flight));

        assertNotNull(
                service.getFlightById(1));
    }
}