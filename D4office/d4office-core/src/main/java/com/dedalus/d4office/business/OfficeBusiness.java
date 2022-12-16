package com.dedalus.d4office.business;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
		return buildOfficeDto(office.orElse(new Office()));		
	}
	
	public List<OfficeDto> getOffices(){
		List<Office> offices =  officeRepository.findAll();
		return offices.stream().map(this::buildOfficeDto).collect(Collectors.toList());
	}
		
	private OfficeDto buildOfficeDto(Office office) {
		OfficeDto officeDto = new OfficeDto();
		BeanUtils.copyProperties(office, officeDto);
		return officeDto;
	}
}
