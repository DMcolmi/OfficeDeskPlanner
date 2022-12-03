package com.dedalus.d4office.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReservationDto {
	private List<DeskDto> deskToBeReserved;
	private List<LocalDate> reservationDates;
	private String mailId;
}
