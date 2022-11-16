package com.dedalus.d4office.business;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dedalus.d4office.dto.SeatDto;
import com.dedalus.d4office.entity.Seat;
import com.dedalus.d4office.repository.SeatRepository;
import com.dedalus.d4office.utils.SeatUtils;

@Service
public class SeatBusiness {
	
	@Autowired
	SeatRepository seatRepository;
	
	public List<SeatDto> getSeatsStatusForSelectedDays(List<LocalDate> selectedDays){
		return null;
	}
	
	public List<SeatDto> getSeatsConf(String office){
		List<Seat> seatConfig = seatRepository.getSeatByOffice(office);
		return SeatUtils.fromSeatListToSeatDtoList(seatConfig);
	}

}
