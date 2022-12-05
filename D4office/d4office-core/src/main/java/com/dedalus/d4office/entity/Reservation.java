package com.dedalus.d4office.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.dedalus.d4office.entity.embeddedid.ReservationId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "reservations")
public class Reservation {
	@Id
	private ReservationId reservationId;	
	private String mailId;
}
