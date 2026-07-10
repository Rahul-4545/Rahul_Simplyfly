package com.hexaware.simplyfly.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.simplyfly.dto.RefundDTO;
import com.hexaware.simplyfly.entity.Booking;
import com.hexaware.simplyfly.entity.Refund;
import com.hexaware.simplyfly.exception.ResourceNotFoundException;
import com.hexaware.simplyfly.repository.BookingRepository;
import com.hexaware.simplyfly.repository.RefundRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RefundServiceImpl implements IRefundService {

    @Autowired
    private RefundRepository repo;

    @Autowired
    private BookingRepository bookingRepo;

    @Override
    public Refund addRefund(RefundDTO dto) {

        log.info("Processing Refund For Booking : {}",
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

        Refund refund = new Refund();

        refund.setBooking(booking);
        refund.setRefundAmount(dto.getRefundAmount());
        refund.setRefundStatus(dto.getRefundStatus());
        refund.setRefundDate(dto.getRefundDate());

        Refund savedRefund = repo.save(refund);

        log.info("Refund Created Successfully : {}",
                savedRefund.getRefundId());

        return savedRefund;
    }

    @Override
    public Refund updateRefund(RefundDTO dto) {

        log.info("Updating Refund : {}",
                dto.getRefundId());

        Refund existingRefund =
                repo.findById(dto.getRefundId())
                .orElseThrow(() -> {

                    log.error("Refund Not Found : {}",
                            dto.getRefundId());

                    return new ResourceNotFoundException(
                            "Refund Not Found : "
                            + dto.getRefundId());
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

        existingRefund.setBooking(booking);
        existingRefund.setRefundAmount(dto.getRefundAmount());
        existingRefund.setRefundStatus(dto.getRefundStatus());
        existingRefund.setRefundDate(dto.getRefundDate());

        Refund updatedRefund = repo.save(existingRefund);

        log.info("Refund Updated Successfully : {}",
                updatedRefund.getRefundId());

        return updatedRefund;
    }

    @Override
    public RefundDTO getById(int refundId) {

        log.info("Fetching Refund By ID : {}",
                refundId);

        Refund refund =
                repo.findById(refundId)
                .orElseThrow(() -> {

                    log.error("Refund Not Found : {}",
                            refundId);

                    return new ResourceNotFoundException(
                            "Refund Not Found : "
                            + refundId);
                });

        RefundDTO dto = new RefundDTO();

        dto.setRefundId(refund.getRefundId());
        dto.setBookingId(refund.getBooking().getBookingId());
        dto.setRefundAmount(refund.getRefundAmount());
        dto.setRefundStatus(refund.getRefundStatus());
        dto.setRefundDate(refund.getRefundDate());

        log.info("Refund Found : {}",
                refundId);

        return dto;
    }

    @Override
    public List<Refund> getAll() {

        log.info("Fetching All Refunds");

        return repo.findAll();
    }

    @Override
    public void deleteById(int refundId) {

        log.warn("Deleting Refund : {}",
                refundId);

        Refund refund =
                repo.findById(refundId)
                .orElseThrow(() -> {

                    log.error("Refund Not Found : {}",
                            refundId);

                    return new ResourceNotFoundException(
                            "Refund Not Found : "
                            + refundId);
                });

        repo.delete(refund);

        log.warn("Refund Deleted : {}",
                refundId);
    }

    @Override
    public List<Refund> getByStatus(String status) {

        log.info("Fetching Refunds By Status : {}",
                status);

        return repo.findByRefundStatus(status);
    }

    @Override
    public List<Refund> getByBookingId(int bookingId) {

        log.info("Fetching Refunds For Booking : {}",
                bookingId);

        return repo.findByBookingBookingId(bookingId);
    }

    @Override
    public List<Refund> getAmountGreaterThan(double amount) {

        log.info("Fetching Refunds Greater Than : {}",
                amount);

        return repo.findByRefundAmountGreaterThan(amount);
    }

    @Override
    public List<Refund> getAmountDesc() {

        log.info("Fetching Refunds Ordered By Amount Desc");

        return repo.findByOrderByRefundAmountDesc();
    }
    @Override
    public List<Refund> getRefundsByUser(int userId) {

        return repo.getRefundsByUser(userId);

    }
    @Override
    public List<Refund> getRefundsByOwner(int ownerId){

        return repo.getRefundsByOwner(ownerId);

    }
}