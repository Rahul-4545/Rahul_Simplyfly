package com.hexaware.simplyfly.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.simplyfly.dto.PaymentDTO;
import com.hexaware.simplyfly.entity.Booking;
import com.hexaware.simplyfly.entity.Payment;
import com.hexaware.simplyfly.exception.PaymentFailedException;
import com.hexaware.simplyfly.exception.ResourceNotFoundException;
import com.hexaware.simplyfly.repository.BookingRepository;
import com.hexaware.simplyfly.repository.PaymentRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PaymentServiceImpl implements IPaymentService {

    @Autowired
    private PaymentRepository repo;

    @Autowired
    private BookingRepository bookingRepo;

    @Override
    public Payment addPayment(PaymentDTO dto) {

        log.info("Processing Payment For Booking : {}",
                dto.getBookingId());

        Booking booking =
                bookingRepo.findById(dto.getBookingId())
                .orElseThrow(() -> {

                    log.error("Booking Not Found : {}",
                            dto.getBookingId());

                    return new ResourceNotFoundException(
                            "Booking Not Found : "
                            + dto.getBookingId());
                });

        if(dto.getPaymentStatus()
              .equalsIgnoreCase("FAILED")) {

            log.error("Payment Failed For Booking : {}",
                    dto.getBookingId());

            throw new PaymentFailedException(
                    "Payment Failed");
        }

        Payment payment = new Payment();

        payment.setBooking(booking);
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaymentStatus(dto.getPaymentStatus());
        payment.setPaymentDate(dto.getPaymentDate());

        Payment savedPayment = repo.save(payment);

        log.info("Payment Created Successfully : {}",
                savedPayment.getPaymentId());

        return savedPayment;
    }

    @Override
    public Payment updatePayment(PaymentDTO dto) {

        log.info("Updating Payment : {}",
                dto.getPaymentId());

        Payment existingPayment =
                repo.findById(dto.getPaymentId())
                .orElseThrow(() -> {

                    log.error("Payment Not Found : {}",
                            dto.getPaymentId());

                    return new ResourceNotFoundException(
                            "Payment Not Found : "
                            + dto.getPaymentId());
                });

        Booking booking =
                bookingRepo.findById(dto.getBookingId())
                .orElseThrow(() -> {

                    log.error("Booking Not Found : {}",
                            dto.getBookingId());

                    return new ResourceNotFoundException(
                            "Booking Not Found : "
                            + dto.getBookingId());
                });

        if(dto.getPaymentStatus()
              .equalsIgnoreCase("FAILED")) {

            log.error("Payment Failed For Booking : {}",
                    dto.getBookingId());

            throw new PaymentFailedException(
                    "Payment Failed");
        }

        existingPayment.setBooking(booking);
        existingPayment.setAmount(dto.getAmount());
        existingPayment.setPaymentMethod(dto.getPaymentMethod());
        existingPayment.setPaymentStatus(dto.getPaymentStatus());
        existingPayment.setPaymentDate(dto.getPaymentDate());

        Payment updatedPayment =
                repo.save(existingPayment);

        log.info("Payment Updated Successfully : {}",
                updatedPayment.getPaymentId());

        return updatedPayment;
    }

    @Override
    public PaymentDTO getById(int paymentId) {

        log.info("Fetching Payment By ID : {}",
                paymentId);

        Payment payment =
                repo.findById(paymentId)
                .orElseThrow(() -> {

                    log.error("Payment Not Found : {}",
                            paymentId);

                    return new ResourceNotFoundException(
                            "Payment Not Found : "
                            + paymentId);
                });

        PaymentDTO dto = new PaymentDTO();

        dto.setPaymentId(payment.getPaymentId());
        dto.setBookingId(payment.getBooking().getBookingId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setPaymentStatus(payment.getPaymentStatus());
        dto.setPaymentDate(payment.getPaymentDate());

        log.info("Payment Found : {}",
                paymentId);

        return dto;
    }

    @Override
    public List<Payment> getAll() {

        log.info("Fetching All Payments");

        return repo.findAll();
    }

    @Override
    public void deleteById(int paymentId) {

        log.warn("Deleting Payment : {}",
                paymentId);

        Payment payment =
                repo.findById(paymentId)
                .orElseThrow(() -> {

                    log.error("Payment Not Found : {}",
                            paymentId);

                    return new ResourceNotFoundException(
                            "Payment Not Found : "
                            + paymentId);
                });

        repo.delete(payment);

        log.warn("Payment Deleted : {}",
                paymentId);
    }

    @Override
    public List<Payment> getByStatus(String status) {

        log.info("Fetching Payments By Status : {}",
                status);

        return repo.findByPaymentStatus(status);
    }

    @Override
    public List<Payment> getByMethod(String method) {

        log.info("Fetching Payments By Method : {}",
                method);

        return repo.findByPaymentMethod(method);
    }

    @Override
    public List<Payment> getByBookingId(int bookingId) {

        log.info("Fetching Payments For Booking : {}",
                bookingId);

        return repo.findByBookingBookingId(bookingId);
    }

    @Override
    public List<Payment> getAmountGreaterThan(double amount) {

        log.info("Fetching Payments Greater Than : {}",
                amount);

        return repo.findByAmountGreaterThan(amount);
    }

    @Override
    public List<Payment> getAmountDesc() {

        log.info("Fetching Payments Ordered By Amount Desc");

        return repo.findByOrderByAmountDesc();
    }
    @Override
    public List<Payment> getPaymentsByOwner(
            int ownerId){

        return repo.getPaymentsByOwner(ownerId);

    }
    @Override
    public List<Payment> getPaymentsByUser(
            int userId) {

        return repo.getPaymentsByUser(userId);

    }
    @Override
    public boolean isPaymentDone(int bookingId) {

        return repo.existsByBookingBookingId(bookingId);

    }
}