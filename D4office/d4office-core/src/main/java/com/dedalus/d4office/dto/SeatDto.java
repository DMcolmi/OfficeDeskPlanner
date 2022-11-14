package com.dedalus.d4office.dto;

import lombok.Data;

@Data
public class SeatDto {
	
	private int seatNo;
	private Double xPos;
	private Double yPos;
	private boolean canBeReserved;
	private boolean isAvailableForSelectedDays;
}