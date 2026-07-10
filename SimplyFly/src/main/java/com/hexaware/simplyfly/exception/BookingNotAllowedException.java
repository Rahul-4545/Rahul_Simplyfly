package com.hexaware.simplyfly.exception;

public class BookingNotAllowedException
        extends RuntimeException {

    public BookingNotAllowedException(String message) {
        super(message);
    }
}