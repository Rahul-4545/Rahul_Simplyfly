package com.hexaware.simplyfly.service;

import java.util.List;
import java.time.LocalDateTime;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.simplyfly.dto.FlightDTO;
import com.hexaware.simplyfly.entity.Flight;
import com.hexaware.simplyfly.exception.ResourceNotFoundException;
import com.hexaware.simplyfly.repository.FlightRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FlightServiceImpl implements IFlightService {

    @Autowired
    private FlightRepository repo;

    @Override
    public Flight addFlight(FlightDTO dto) {

        log.info("Adding Flight : {}", dto.getFlightNumber());

        if (!dto.getDepartureTime().isAfter(LocalDateTime.now())) {

            throw new IllegalArgumentException(
                    "Departure time must be in the future");

        }

        if (!dto.getArrivalTime().isAfter(dto.getDepartureTime())) {

            throw new IllegalArgumentException(
                    "Arrival time must be after departure time");

        }

        Flight flight = new Flight();

        // remaining code...
        flight.setFlightName(dto.getFlightName());
        flight.setFlightNumber(dto.getFlightNumber());
        flight.setOrigin(dto.getOrigin());
        flight.setDestination(dto.getDestination());
        flight.setDepartureTime(dto.getDepartureTime());
        flight.setArrivalTime(dto.getArrivalTime());
        flight.setFare(dto.getFare());
        flight.setTotalSeats(dto.getTotalSeats());
        flight.setAvailableSeats(dto.getAvailableSeats());
        flight.setBaggageCheckin(dto.getBaggageCheckin());
        flight.setBaggageCabin(dto.getBaggageCabin());
        flight.setOwnerId(dto.getOwnerId());

        Flight savedFlight = repo.save(flight);

        log.info("Flight Added Successfully : {}",
                savedFlight.getFlightId());

        return savedFlight;
    }

    @Override
    public Flight updateFlight(FlightDTO dto) {
    	
    	if (!dto.getDepartureTime().isAfter(LocalDateTime.now())) {

    	    throw new IllegalArgumentException(
    	            "Departure time must be in the future");

    	}

    	if (!dto.getArrivalTime().isAfter(dto.getDepartureTime())) {

    	    throw new IllegalArgumentException(
    	            "Arrival time must be after departure time");

    	}

        log.info("Updating Flight : {}", dto.getFlightId());

        Flight flight = repo.findById(dto.getFlightId())
                .orElseThrow(() -> {

                    log.error("Flight Not Found : {}",
                            dto.getFlightId());

                    return new ResourceNotFoundException(
                            "Flight Not Found : " + dto.getFlightId());
                });

        flight.setFlightName(dto.getFlightName());
        flight.setFlightNumber(dto.getFlightNumber());
        flight.setOrigin(dto.getOrigin());
        flight.setDestination(dto.getDestination());
        flight.setDepartureTime(dto.getDepartureTime());
        flight.setArrivalTime(dto.getArrivalTime());
        flight.setFare(dto.getFare());
        flight.setTotalSeats(dto.getTotalSeats());
        flight.setAvailableSeats(dto.getAvailableSeats());
        flight.setBaggageCheckin(dto.getBaggageCheckin());
        flight.setBaggageCabin(dto.getBaggageCabin());
        flight.setOwnerId(dto.getOwnerId());

        Flight updatedFlight = repo.save(flight);

        log.info("Flight Updated Successfully : {}",
                updatedFlight.getFlightId());

        return updatedFlight;
    }

    @Override
    public FlightDTO getFlightById(int flightId) {

        log.info("Fetching Flight By ID : {}", flightId);

        Flight flight = repo.findById(flightId)
                .orElseThrow(() -> {

                    log.error("Flight Not Found : {}", flightId);

                    return new ResourceNotFoundException(
                            "Flight Not Found : " + flightId);
                });

        FlightDTO dto = new FlightDTO();

        dto.setFlightId(flight.getFlightId());
        dto.setFlightName(flight.getFlightName());
        dto.setFlightNumber(flight.getFlightNumber());
        dto.setOrigin(flight.getOrigin());
        dto.setDestination(flight.getDestination());
        dto.setDepartureTime(flight.getDepartureTime());
        dto.setArrivalTime(flight.getArrivalTime());
        dto.setFare(flight.getFare());
        dto.setTotalSeats(flight.getTotalSeats());
        dto.setAvailableSeats(flight.getAvailableSeats());
        dto.setBaggageCheckin(flight.getBaggageCheckin());
        dto.setBaggageCabin(flight.getBaggageCabin());
        dto.setOwnerId(flight.getOwnerId());

        log.info("Flight Found : {}", flightId);

        return dto;
    }

    @Override
    public List<Flight> getAllFlights() {

        log.info("Fetching All Flights");

        return repo.findAll();
    }

    @Override
    public void deleteFlight(int flightId) {

        log.warn("Deleting Flight : {}", flightId);

        Flight flight = repo.findById(flightId)
                .orElseThrow(() -> {

                    log.error("Flight Not Found : {}", flightId);

                    return new ResourceNotFoundException(
                            "Flight Not Found : " + flightId);
                });

        repo.delete(flight);

        log.warn("Flight Deleted : {}", flightId);
    }

    @Override
    public List<Flight> getByOrigin(String origin) {

        log.info("Searching Flights By Origin : {}", origin);

        return repo.findByOrigin(origin);
    }

    @Override
    public List<Flight> getByDestination(String destination) {

        log.info("Searching Flights By Destination : {}",
                destination);

        return repo.findByDestination(destination);
    }

    @Override
    public List<Flight> getByOriginAndDestination(
            String origin,
            String destination) {

        log.info("Searching Flights From {} To {}",
                origin,
                destination);

        return repo.findByOriginAndDestination(
                origin,
                destination);
    }

    @Override
    public List<Flight> getFareLessThan(double fare) {

        log.info("Searching Flights With Fare Less Than : {}",
                fare);

        return repo.findByFareLessThan(fare);
    }

    @Override
    public List<Flight> getFlightContaining(String name) {

        log.info("Searching Flight Name Containing : {}",
                name);

        return repo.findByFlightNameContaining(name);
    }

    @Override
    public List<Flight> getFareAsc() {

        log.info("Fetching Flights By Fare Ascending");

        return repo.findByOrderByFareAsc();
    }

    @Override
    public List<Flight> getFareDesc() {

        log.info("Fetching Flights By Fare Descending");

        return repo.findByOrderByFareDesc();
    }
    
    @Override
    public List<Flight> getFlightsByOwner(int ownerId) {

        log.info("Fetching Flights for Owner : {}", ownerId);

        return repo.findByOwnerId(ownerId);

    }
    @Override
    public List<Flight> getFlightsByOriginJPQL(
            String origin) {

        log.info(
                "JPQL Search Flights By Origin : {}",
                origin);

        return repo.getFlightsByOriginJPQL(
                origin);
    }

    @Override
    public List<Flight> getFlightsByDestinationNamed(
            String destination) {

        log.info(
                "Named Query Search Destination : {}",
                destination);

        return repo.getFlightsByDestinationNamed(
                destination);
    }

}