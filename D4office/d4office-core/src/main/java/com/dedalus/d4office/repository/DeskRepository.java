package com.dedalus.d4office.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dedalus.d4office.entity.Desk;
import com.dedalus.d4office.entity.embeddedid.DeskId;

public interface DeskRepository extends JpaRepository<Desk, DeskId> {
	
	@Query(value = "select * from DESKS where office_id = :office", nativeQuery = true)
	public List<Desk> getDeskByOffice(String office);
	
	@Query(value = "select distinct d.desk_no, d.office_id, can_be_reserved, x_pos, y_pos,\r\n"
			+ "case when r.is_reserved is not null then is_reserved else false end as is_reserved \r\n"
			+ "from desks d  \r\n"
			+ "left join reservations r on d.office_id = r.office_id and d.desk_no = r.desk_no \r\n"
			+ "where d.office_id = 'MI' order by d.desk_no", nativeQuery = true)
	public List<Desk> getReservableDeskForSelectedDays(List<LocalDate> selectedDays);

}
