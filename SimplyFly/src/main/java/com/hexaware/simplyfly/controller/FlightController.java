package com.hexaware.simplyfly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.hexaware.simplyfly.dto.FlightDTO;
import com.hexaware.simplyfly.entity.Flight;
import com.hexaware.simplyfly.service.IFlightService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/flights")
@Validated
public class FlightController {

    @Autowired
    private IFlightService service;

    @PostMapping("/add")
    public Flight addFlight(
            @Valid @RequestBody FlightDTO dto) {

        return service.addFlight(dto);
    }

    @PutMapping("/update")
    public Flight updateFlight(
            @Valid @RequestBody FlightDTO dto) {

        return service.updateFlight(dto);
    }

    @GetMapping("/getbyid/{id}")
    public FlightDTO getById(
            @PathVariable int id) {

        return service.getFlightById(id);
    }

    @GetMapping("/getall")
    public List<Flight> getAllFlights() {

        return service.getAllFlights();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFlight(
            @PathVariable int id) {

        service.deleteFlight(id);

        return new ResponseEntity<>(
                "Flight Deleted Successfully",
                HttpStatus.OK);
    }

    @GetMapping("/origin/{origin}")
    public List<Flight> getByOrigin(
            @PathVariable String origin) {

        return service.getByOrigin(origin);
    }

    @GetMapping("/destination/{destination}")
    public List<Flight> getByDestination(
            @PathVariable String destination) {

        return service.getByDestination(destination);
    }

    @GetMapping("/search/{origin}/{destination}")
    public List<Flight> getByOriginDestination(
            @PathVariable String origin,
            @PathVariable String destination) {

        return service.getByOriginAndDestination(
                origin,
                destination);
    }

    @GetMapping("/fare/{fare}")
    public List<Flight> fareLessThan(
            @PathVariable double fare) {

        return service.getFareLessThan(fare);
    }

    @GetMapping("/name/{name}")
    public List<Flight> flightContaining(
            @PathVariable String name) {

        return service.getFlightContaining(name);
    }

    @GetMapping("/fareasc")
    public List<Flight> fareAsc() {

        return service.getFareAsc();
    }

    @GetMapping("/faredesc")
    public List<Flight> fareDesc() {

        return service.getFareDesc();
    }
    
    @GetMapping("/jpql/origin/{origin}")
    public List<Flight> getFlightsByOriginJPQL(
            @PathVariable String origin){

        return service.getFlightsByOriginJPQL(
                origin);
    }

    @GetMapping("/named/destination/{destination}")
    public List<Flight> getFlightsByDestinationNamed(
            @PathVariable String destination){

        return service.getFlightsByDestinationNamed(
                destination);
    }
    @GetMapping("/owner/{ownerId}")
    public List<Flight> getFlightsByOwner(

            @PathVariable int ownerId) {

        return service.getFlightsByOwner(ownerId);

    }

}