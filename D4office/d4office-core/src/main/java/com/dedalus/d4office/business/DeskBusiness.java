package com.dedalus.d4office.business;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dedalus.d4office.dto.DeskDto;
import com.dedalus.d4office.entity.Desk;
import com.dedalus.d4office.repository.DeskRepository;
import com.dedalus.d4office.utils.DeskUtils;

@Service
public class DeskBusiness {
	
	@Autowired
	DeskRepository seatRepository;
	
	public List<DeskDto> getReservableDeskForSelectedDays(List<LocalDate> selectedDays){		
		List<Desk> reservableDeskForSelectedDays = seatRepository.getReservableDeskForSelectedDays(selectedDays);
		return DeskUtils.fromDeskListToDeskDtoList(reservableDeskForSelectedDays);
	}
	
	public List<DeskDto> getDesksConf(String office){
		List<Desk> seatConfig = seatRepository.getDeskByOffice(office);
		return DeskUtils.fromDeskListToDeskDtoList(seatConfig);
	}

}
