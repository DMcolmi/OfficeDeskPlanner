package com.dedalus.d4office.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dedalus.d4office.entity.Seat;
import com.dedalus.d4office.entity.embeddedId.SeatId;

public interface SeatRepository extends JpaRepository<Seat, SeatId> {
	
	@Query(value = "select * from SEATS where office_id = :office", nativeQuery = true)
	public List<Seat> getSeatByOffice(String office);

}
