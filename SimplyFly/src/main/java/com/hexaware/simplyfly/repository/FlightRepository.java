package com.hexaware.simplyfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hexaware.simplyfly.entity.Flight;

@Repository
public interface FlightRepository
        extends JpaRepository<Flight, Integer> {

    List<Flight> findByOrigin(String origin);

    List<Flight> findByDestination(String destination);

    List<Flight> findByOriginAndDestination(
            String origin,
            String destination);

    List<Flight> findByFareLessThan(double fare);

    List<Flight> findByFlightNameContaining(String name);

    List<Flight> findByOrderByFareAsc();

    List<Flight> findByOrderByFareDesc();
    List<Flight> findByOwnerId(int ownerId);

    // JPQL

    @Query(
            "select f from Flight f where f.origin=:origin"
    )
    List<Flight> getFlightsByOriginJPQL(
            @Param("origin") String origin);

    // Named Query

    @Query(
            name = "Flight.findByDestinationNamed"
    )
    List<Flight> getFlightsByDestinationNamed(
            @Param("destination") String destination);

}