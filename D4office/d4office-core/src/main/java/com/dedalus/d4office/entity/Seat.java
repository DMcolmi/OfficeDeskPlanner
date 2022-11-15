package com.dedalus.d4office.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "seats")
public class Seat {	

	@EmbeddedId
	private SeatId seatId;
	
	@Column
	private Double xPos;
	
	@Column
	private Double yPos;
	
	@Column
	private boolean canBeReserved;
	
	@Transient
	private boolean isAvailableForSelectedDays;
	
	@Getter
	@Setter
	@Embeddable
	public class SeatId implements Serializable {
		
		private static final long serialVersionUID = 1L;
		
		@Column(nullable = false)		
		private int seatNo;		
		
		@Column(nullable = false)
		private String officeId;		
	}
}
