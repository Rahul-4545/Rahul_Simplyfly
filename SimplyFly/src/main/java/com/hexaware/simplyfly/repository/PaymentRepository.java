package com.hexaware.simplyfly.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.simplyfly.entity.Payment;

public interface PaymentRepository
extends JpaRepository<Payment,Integer>{

    List<Payment> findByPaymentStatus(String paymentStatus);

    List<Payment> findByPaymentMethod(String paymentMethod);

    List<Payment> findByBookingBookingId(int bookingId);

    List<Payment> findByAmountGreaterThan(double amount);

    List<Payment> findByOrderByAmountDesc();
    boolean existsByBookingBookingId(int bookingId);
    @Query(
    		"select p from Payment p where p.booking.flight.ownerId=:ownerId"
    		)
    		List<Payment> getPaymentsByOwner(
    		        @Param("ownerId") int ownerId);
    
    @Query(
    	    "select p from Payment p where p.booking.user.userId=:userId"
    	)
    	List<Payment> getPaymentsByUser(
    	        @Param("userId") int userId);
}