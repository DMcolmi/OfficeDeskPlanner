package com.dedalus.d4office.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dedalus.d4office.business.OfficeBusiness;
import com.dedalus.d4office.dto.OfficeDto;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/offices")
public class OfficeController {
	
	@Autowired
	OfficeBusiness officeBusiness;
	
	@GetMapping(path = "/{officeId}")
	public OfficeDto getOfficeById(@PathVariable String officeId) {
		return officeBusiness.getOfficeById(officeId);
	}

}
