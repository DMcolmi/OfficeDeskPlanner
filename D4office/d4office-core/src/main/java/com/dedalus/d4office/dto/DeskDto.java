package com.dedalus.d4office.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeskDto {
	
	private int deskNo;
	private String officeId;
	private Double xPos;
	private Double yPos;
	private boolean canBeReserved;
	private Boolean isAvailableForSelectedDays;
}