package com.hexaware.simplyfly.service;

import java.util.List;

import com.hexaware.simplyfly.dto.PaymentDTO;
import com.hexaware.simplyfly.entity.Payment;

public interface IPaymentService {

    Payment addPayment(PaymentDTO dto);

    Payment updatePayment(PaymentDTO dto);

    PaymentDTO getById(int paymentId);

    List<Payment> getAll();

    void deleteById(int paymentId);

    List<Payment> getByStatus(String status);

    List<Payment> getByMethod(String method);

    List<Payment> getByBookingId(int bookingId);

    List<Payment> getAmountGreaterThan(double amount);

    List<Payment> getAmountDesc();
    List<Payment> getPaymentsByOwner(int ownerId);
    List<Payment> getPaymentsByUser(int userId);
    boolean isPaymentDone(int bookingId);
}