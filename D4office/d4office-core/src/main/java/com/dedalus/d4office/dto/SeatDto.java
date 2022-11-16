package com.dedalus.d4office.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SeatDto {
	
	private int seatNo;
	private Double xPos;
	private Double yPos;
	private boolean canBeReserved;
	private boolean isAvailableForSelectedDays;
}