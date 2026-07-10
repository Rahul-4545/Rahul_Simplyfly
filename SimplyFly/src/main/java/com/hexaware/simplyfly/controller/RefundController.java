package com.hexaware.simplyfly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.hexaware.simplyfly.dto.RefundDTO;
import com.hexaware.simplyfly.entity.Refund;
import com.hexaware.simplyfly.service.IRefundService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/refunds")
@Validated
public class RefundController {

    @Autowired
    private IRefundService service;

    @PostMapping("/add")
    public Refund addRefund(
            @Valid @RequestBody RefundDTO dto) {

        return service.addRefund(dto);
    }

    @PutMapping("/update")
    public Refund updateRefund(
            @Valid @RequestBody RefundDTO dto) {

        return service.updateRefund(dto);
    }

    @GetMapping("/getall")
    public List<Refund> getAll() {

        return service.getAll();
    }

    @GetMapping("/getbyid/{id}")
    public RefundDTO getById(
            @PathVariable int id) {

        return service.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRefund(
            @PathVariable int id) {

        service.deleteById(id);

        return new ResponseEntity<>(
                "Refund Deleted Successfully",
                HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public List<Refund> getByStatus(
            @PathVariable String status) {

        return service.getByStatus(status);
    }

    @GetMapping("/booking/{bookingId}")
    public List<Refund> getByBookingId(
            @PathVariable int bookingId) {

        return service.getByBookingId(bookingId);
    }

    @GetMapping("/amount/{amount}")
    public List<Refund> getAmountGreaterThan(
            @PathVariable double amount) {

        return service.getAmountGreaterThan(amount);
    }

    @GetMapping("/amountdesc")
    public List<Refund> getAmountDesc() {

        return service.getAmountDesc();
    }
    @GetMapping("/user/{userId}")
    public List<Refund> getRefundsByUser(

            @PathVariable int userId){

        return service.getRefundsByUser(userId);

    }
    @GetMapping("/owner/{ownerId}")
    public List<Refund> getRefundsByOwner(
            @PathVariable int ownerId){

        return service.getRefundsByOwner(ownerId);

    }
}