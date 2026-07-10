package com.hexaware.simplyfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.simplyfly.entity.Refund;

public interface RefundRepository
        extends JpaRepository<Refund,Integer>{

    List<Refund> findByRefundStatus(String refundStatus);

    List<Refund> findByBookingBookingId(int bookingId);

    List<Refund> findByRefundAmountGreaterThan(double amount);

    List<Refund> findByOrderByRefundAmountDesc();
    @Query(
    	    "select r from Refund r where r.booking.user.userId=:userId"
    	)
    	List<Refund> getRefundsByUser(
    	        @Param("userId") int userId);
    @Query("""
    		select r
    		from Refund r
    		where r.booking.flight.ownerId = :ownerId
    		""")
    		List<Refund> getRefundsByOwner(
    		        @Param("ownerId") int ownerId);
}