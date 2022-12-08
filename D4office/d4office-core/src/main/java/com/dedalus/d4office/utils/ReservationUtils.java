package com.dedalus.d4office.utils;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class ReservationUtils {
	
	private ReservationUtils() {}
	
	public static List<LocalDate> formatDateList(List<Date> dateListIn){
		return dateListIn.stream().map(ReservationUtils::formatDate).collect(Collectors.toList());
	}
	
	public static LocalDate formatDate(Date dateIn) {
		return Instant.ofEpochMilli(dateIn.getTime())
			      .atZone(ZoneId.systemDefault())
			      .toLocalDate();
	}

}
