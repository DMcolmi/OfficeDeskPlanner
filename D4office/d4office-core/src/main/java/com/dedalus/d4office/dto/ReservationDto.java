package com.dedalus.d4office.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReservationDto {
	private List<DeskDto> deskToBeReserved;
	private List<Date> reservationDates;
	private String mailId;
}
