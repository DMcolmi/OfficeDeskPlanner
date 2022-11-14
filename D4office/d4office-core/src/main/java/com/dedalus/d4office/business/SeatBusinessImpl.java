package com.dedalus.d4office.business;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dedalus.d4office.dto.SeatDto;
import com.dedalus.d4office.repository.SeatRepository;

@Service
public class SeatBusinessImpl {
	
	@Autowired
	SeatRepository seatRepository;
	
	public List<SeatDto> getSeatsStatusForSelectedDays(List<LocalDate> selectedDays){
		return null;
	}

}
