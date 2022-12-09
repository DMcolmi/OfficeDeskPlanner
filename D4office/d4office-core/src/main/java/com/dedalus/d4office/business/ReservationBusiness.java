package com.dedalus.d4office.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dedalus.d4office.dto.ReservationDto;
import com.dedalus.d4office.entity.Reservation;
import com.dedalus.d4office.entity.embeddedid.ReservationId;
import com.dedalus.d4office.repository.ReservationRepository;
import com.dedalus.d4office.utils.ReservationUtils;

@Service
public class ReservationBusiness {
	
	@Autowired
	ReservationRepository reservationRepository;
	
	public void bookDesks(ReservationDto reservation) {		
		reservation.getDeskToBeReserved().stream().forEach(desk -> 
			reservation.getReservationDates().stream().forEach( bookingDate -> {
				
				ReservationId resId = new ReservationId(desk.getDeskNo(), desk.getOfficeId(), ReservationUtils.formatDate(bookingDate));
				Reservation res = new Reservation(resId, reservation.getMailId(), true);
				reservationRepository.save(res);
				
			})
		);		
	}
	
}
