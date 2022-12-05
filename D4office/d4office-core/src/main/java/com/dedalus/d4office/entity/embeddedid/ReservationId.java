package com.dedalus.d4office.entity.embeddedid;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ReservationId implements Serializable {
	private static final long serialVersionUID = 1L;	
	private int deskNo;	
	private String officeId;	
	private LocalDate bookingDate;
}
