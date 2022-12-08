package com.dedalus.d4office.controller;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dedalus.d4office.business.DeskBusiness;
import com.dedalus.d4office.business.ReservationBusiness;
import com.dedalus.d4office.dto.DeskDto;
import com.dedalus.d4office.dto.ReservationDto;
import com.dedalus.d4office.utils.ReservationUtils;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/desks")
public class DeskController {
	
	@Autowired
	DeskBusiness deskBusiness;
	
	@Autowired ReservationBusiness reservationBusiness; 
	
	@GetMapping(value = "/{office}")
	public List<DeskDto> getDesksConf(@PathVariable String office){
		return deskBusiness.getDesksConf(office);
	}
	
	@PostMapping(value = "/book")
	public void bookDesks(@RequestBody ReservationDto reservation) {
		reservationBusiness.bookDesks(reservation);
	}
	
	@PostMapping(value = "/getReservableDeskForDays")
	public List<DeskDto> getReservableDeskForSelectedDays(@RequestBody List<Date> selectedDays){
		return deskBusiness.getReservableDeskForSelectedDays(ReservationUtils.formatDateList(selectedDays));
	}
}
