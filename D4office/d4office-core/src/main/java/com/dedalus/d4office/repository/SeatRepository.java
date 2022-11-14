package com.dedalus.d4office.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dedalus.d4office.entity.Seat;
import com.dedalus.d4office.entity.Seat.SeatId;

public interface SeatRepository extends JpaRepository<Seat, SeatId> {

}
