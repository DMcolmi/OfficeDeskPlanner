package com.dedalus.d4office.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReservationDto {
	@JsonProperty
	private List<DeskDto> deskToBeReserved;
	@JsonProperty
	private List<LocalDate> reservationDates;
	@JsonProperty
	private String mailId;
}
