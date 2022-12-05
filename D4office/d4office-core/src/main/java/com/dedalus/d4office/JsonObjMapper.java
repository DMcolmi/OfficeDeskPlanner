package com.dedalus.d4office;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;


import com.dedalus.d4office.dto.DeskDto;
import com.dedalus.d4office.dto.ReservationDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;

public class JsonObjMapper {
	
	public static void main(String[] args) throws JsonProcessingException {
		
		ObjectMapper mapper = new ObjectMapper();
		JavaTimeModule javaTimeModule=new JavaTimeModule();
        // Hack time module to allow 'Z' at the end of string (i.e. javascript json's) 
        javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ISO_DATE_TIME));
        mapper.registerModule(javaTimeModule);
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
   
		
		DeskDto desk = new DeskDto(1, "MI", null, null, false, false);
		ArrayList<LocalDate> dateList = new ArrayList<>();
		ArrayList<DeskDto> deskList = new ArrayList<>();
		dateList.add(LocalDate.now());
		deskList.add(desk);		
		ReservationDto res = new ReservationDto(deskList, dateList, "davide@mail.it");
		
		String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(res);
		System.out.println(jsonString);
		
		
	}

}
