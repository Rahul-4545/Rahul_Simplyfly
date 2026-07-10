package com.hexaware.simplyfly.exception;

public class FlightNotAvailableException
        extends RuntimeException {

    public FlightNotAvailableException(String message) {
        super(message);
    }
}