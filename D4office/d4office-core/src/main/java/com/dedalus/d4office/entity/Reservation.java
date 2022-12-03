package com.dedalus.d4office.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.dedalus.d4office.entity.embeddedid.ReservationId;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity(name = "reservations")
public class Reservation {
	@Id
	private ReservationId reservationId;	
	private String mailId;
}
