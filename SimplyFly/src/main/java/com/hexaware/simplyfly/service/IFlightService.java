package com.hexaware.simplyfly.service;

import java.util.List;

import com.hexaware.simplyfly.dto.FlightDTO;
import com.hexaware.simplyfly.entity.Flight;

public interface IFlightService {

    Flight addFlight(FlightDTO dto);

    Flight updateFlight(FlightDTO dto);

    FlightDTO getFlightById(int flightId);

    List<Flight> getAllFlights();

    void deleteFlight(int flightId);

    List<Flight> getByOrigin(String origin);

    List<Flight> getByDestination(String destination);

    List<Flight> getByOriginAndDestination(
            String origin,
            String destination);

    List<Flight> getFareLessThan(double fare);

    List<Flight> getFlightContaining(String name);

    List<Flight> getFareAsc();

    List<Flight> getFareDesc();
    List<Flight> getFlightsByOwner(int ownerId);

    // JPQL

    List<Flight> getFlightsByOriginJPQL(
            String origin);

    // Named Query

    List<Flight> getFlightsByDestinationNamed(
            String destination);

}