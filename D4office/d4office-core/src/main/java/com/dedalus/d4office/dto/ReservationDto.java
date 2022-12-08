package com.dedalus.d4office.dto;

import java.util.Date;
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
	private List<Date> reservationDates;
	@JsonProperty
	private String mailId;
}
