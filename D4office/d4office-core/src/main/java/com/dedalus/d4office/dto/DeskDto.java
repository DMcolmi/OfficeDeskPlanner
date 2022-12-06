package com.dedalus.d4office.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeskDto {
	
	private int deskNo;
	private String officeId;
	private Double xPos;
	private Double yPos;
	private boolean canBeReserved;
	private Boolean isReserved;
}