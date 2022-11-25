package com.dedalus.d4office.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dedalus.d4office.entity.Reservation;
import com.dedalus.d4office.entity.embeddedid.ReservationId;

public interface ReservationRepository extends JpaRepository<Reservation, ReservationId> {

}
