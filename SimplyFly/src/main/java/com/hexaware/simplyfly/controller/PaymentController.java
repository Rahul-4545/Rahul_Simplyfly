package com.hexaware.simplyfly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.hexaware.simplyfly.dto.PaymentDTO;
import com.hexaware.simplyfly.entity.Payment;
import com.hexaware.simplyfly.service.IPaymentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payments")
@Validated
public class PaymentController {

    @Autowired
    private IPaymentService service;

    @PostMapping("/add")
    public Payment addPayment(
            @Valid @RequestBody PaymentDTO dto) {

        return service.addPayment(dto);
    }

    @PutMapping("/update")
    public Payment updatePayment(
            @Valid @RequestBody PaymentDTO dto) {

        return service.updatePayment(dto);
    }

    @GetMapping("/getall")
    public List<Payment> getAll() {

        return service.getAll();
    }

    @GetMapping("/getbyid/{id}")
    public PaymentDTO getById(
            @PathVariable int id) {

        return service.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePayment(
            @PathVariable int id) {

        service.deleteById(id);

        return new ResponseEntity<>(
                "Payment Deleted Successfully",
                HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public List<Payment> getByStatus(
            @PathVariable String status) {

        return service.getByStatus(status);
    }

    @GetMapping("/method/{method}")
    public List<Payment> getByMethod(
            @PathVariable String method) {

        return service.getByMethod(method);
    }

    @GetMapping("/booking/{bookingId}")
    public List<Payment> getByBookingId(
            @PathVariable int bookingId) {

        return service.getByBookingId(bookingId);
    }

    @GetMapping("/amount/{amount}")
    public List<Payment> getAmountGreaterThan(
            @PathVariable double amount) {

        return service.getAmountGreaterThan(amount);
    }

    @GetMapping("/amountdesc")
    public List<Payment> getAmountDesc() {

        return service.getAmountDesc();
    }
    @GetMapping("/owner/{ownerId}")
    public List<Payment> getPaymentsByOwner(

            @PathVariable int ownerId){

        return service.getPaymentsByOwner(ownerId);

    }
    @GetMapping("/user/{userId}")
    public List<Payment> getPaymentsByUser(

            @PathVariable int userId){

        return service.getPaymentsByUser(userId);

    }
    @GetMapping("/exists/{bookingId}")
    public boolean paymentExists(

            @PathVariable int bookingId){

        return service.isPaymentDone(bookingId);

    }
}