package com.dedalus.d4office.utils;

import java.util.List;
import java.util.stream.Collectors;

import com.dedalus.d4office.dto.DeskDto;
import com.dedalus.d4office.entity.Desk;

public class DeskUtils {
	
	private DeskUtils() {		
	}
	
	public static List<DeskDto> fromDeskListToDeskDtoList(List<Desk> seatList) {
		return seatList.stream().map(t -> new DeskDto(t.getDeskId().getDeskNo(), t.getDeskId().getOfficeId(), t.getXPos(), t.getYPos(), t.isCanBeReserved(), t.getIsReserved())).collect(Collectors.toList());
 	}

}
