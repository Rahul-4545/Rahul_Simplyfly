package com.hexaware.simplyfly.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Resource Not Found

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleResourceNotFoundException(
            ResourceNotFoundException ex) {

        return ex.getMessage();
    }

    // Invalid Travel Date

    @ExceptionHandler(InvalidTravelDateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleInvalidTravelDateException(
            InvalidTravelDateException ex) {

        return ex.getMessage();
    }

    // Seat Already Booked

    @ExceptionHandler(SeatAlreadyBookedException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String handleSeatAlreadyBookedException(
            SeatAlreadyBookedException ex) {

        return ex.getMessage();
    }

    // Flight Not Available

    @ExceptionHandler(FlightNotAvailableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleFlightNotAvailableException(
            FlightNotAvailableException ex) {

        return ex.getMessage();
    }

    // Booking Not Allowed

    @ExceptionHandler(BookingNotAllowedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleBookingNotAllowedException(
            BookingNotAllowedException ex) {

        return ex.getMessage();
    }

    // Payment Failed

    @ExceptionHandler(PaymentFailedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handlePaymentFailedException(
            PaymentFailedException ex) {

        return ex.getMessage();
    }

    // Validation Exceptions

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
          .getFieldErrors()
          .forEach(error ->
              errors.put(
                      error.getField(),
                      error.getDefaultMessage()));

        return errors;
    }

    // Generic Exception

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleException(Exception ex) {

        return ex.getMessage();
    }
}