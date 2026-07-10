package com.hexaware.simplyfly.exception;

public class PaymentFailedException
        extends RuntimeException {

    public PaymentFailedException(String message) {
        super(message);
    }
}