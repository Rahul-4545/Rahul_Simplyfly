package com.hexaware.simplyfly.service;

import java.util.List;

import com.hexaware.simplyfly.dto.BookingSeatDTO;
import com.hexaware.simplyfly.entity.BookingSeat;

public interface IBookingSeatService {

    BookingSeat addBookingSeat(BookingSeatDTO dto);

    BookingSeat updateBookingSeat(BookingSeatDTO dto);

    BookingSeatDTO getById(int bookingSeatId);

    List<BookingSeat> getAll();

    void deleteById(int bookingSeatId);

    List<BookingSeat> getByBookingId(int bookingId);

    List<BookingSeat> getBySeatId(int seatId);
}