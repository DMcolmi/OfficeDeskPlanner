package com.dedalus.d4office.business;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dedalus.d4office.dto.OfficeDto;
import com.dedalus.d4office.entity.Office;
import com.dedalus.d4office.repository.OfficeRepository;

@Service
public class OfficeBusiness {
	
	@Autowired
	OfficeRepository officeRepository;
	
	public OfficeDto getOfficeById(String officeId) {
		Optional<Office> office = officeRepository.findById(officeId);
		OfficeDto officeDto =  new OfficeDto();
		BeanUtils.copyProperties(office.orElse(new Office()), officeDto);
		return officeDto;		
	}
}
