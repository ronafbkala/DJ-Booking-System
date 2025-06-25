package com.rona.backend.controller;

import com.rona.backend.model.Booking;
import com.rona.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping
    public List<Booking> getAllBookings() {
        System.out.println("HÄMTAR ALLA DATA!");
        return bookingRepository.findAll();
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

    // ✅ NYTT: Ta bort bokning via ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    bookingRepository.delete(booking);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        return bookingRepository.findById(id)
                .map(existingBooking -> {
                    if (updatedBooking.getName() != null) {
                        existingBooking.setName(updatedBooking.getName());
                    }
                    if (updatedBooking.getPhone() != null) {
                        existingBooking.setPhone(updatedBooking.getPhone());
                    }
                    if (updatedBooking.getDate() != null) {
                        existingBooking.setDate(updatedBooking.getDate());
                    }
                    if (updatedBooking.getStatus() != null) {
                        existingBooking.setStatus(updatedBooking.getStatus());
                    }

                    Booking saved = bookingRepository.save(existingBooking);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }



}