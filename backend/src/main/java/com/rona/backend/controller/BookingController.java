package com.rona.backend.controller;

import com.rona.backend.model.Booking;
import com.rona.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // GET: Hämta alla bokade datum (efter idag)
    @GetMapping("/dates")
    public List<String> getFutureBookings() {
        System.out.println("📅 HÄMTAR BARA DATUM!");
        List<Booking> bookings = bookingRepository.findAllByDateAfter(LocalDate.now().minusDays(1));
        return bookings.stream().map(booking -> booking.getDate().toString()).toList();
    }

    // POST: Lägg till ny bokning
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }

    @GetMapping("/test")
    public String hello() {
        return "✅ Backend fungerar i Docker!";
    }
}