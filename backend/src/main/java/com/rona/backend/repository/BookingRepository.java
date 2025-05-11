package com.rona.backend.repository;

import com.rona.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByDate(LocalDate date);
    List<Booking> findAllByDateAfter(LocalDate date);
}