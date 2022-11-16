package com.dedalus.d4office.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dedalus.d4office.business.SeatBusiness;
import com.dedalus.d4office.dto.SeatDto;

@RestController
@RequestMapping(value = "/seats")
public class SeatController {
	
	@Autowired
	SeatBusiness seatBusiness;
	
	@GetMapping(value = "/{office}")
	public List<SeatDto> getSeatsConf(@PathVariable String office){
		return seatBusiness.getSeatsConf(office);
	}
}
