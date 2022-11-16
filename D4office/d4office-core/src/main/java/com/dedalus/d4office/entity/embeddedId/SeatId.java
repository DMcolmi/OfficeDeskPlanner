package com.dedalus.d4office.entity.embeddedId;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

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
