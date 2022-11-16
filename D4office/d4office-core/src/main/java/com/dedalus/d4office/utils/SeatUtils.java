package com.dedalus.d4office.utils;

import java.util.List;
import java.util.stream.Collectors;

import com.dedalus.d4office.dto.SeatDto;
import com.dedalus.d4office.entity.Seat;

public class SeatUtils {
	
	private SeatUtils() {
		
	}
	
	public static List<SeatDto> fromSeatListToSeatDtoList(List<Seat> seatList) {
		return seatList.stream().map(t -> new SeatDto(t.getSeatId().getSeatNo(), t.getXPos(), t.getYPos(), t.isCanBeReserved(), t.isAvailableForSelectedDays())).collect(Collectors.toList());
 	}

}
