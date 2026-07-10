package com.hexaware.simplyfly.service;

import java.util.List;

import com.hexaware.simplyfly.dto.RefundDTO;
import com.hexaware.simplyfly.entity.Refund;

public interface IRefundService {

    Refund addRefund(RefundDTO dto);

    Refund updateRefund(RefundDTO dto);

    RefundDTO getById(int refundId);

    List<Refund> getAll();

    void deleteById(int refundId);

    List<Refund> getByStatus(String status);

    List<Refund> getByBookingId(int bookingId);

    List<Refund> getAmountGreaterThan(double amount);

    List<Refund> getAmountDesc();
    List<Refund> getRefundsByUser(int userId);
    List<Refund> getRefundsByOwner(int ownerId);
}