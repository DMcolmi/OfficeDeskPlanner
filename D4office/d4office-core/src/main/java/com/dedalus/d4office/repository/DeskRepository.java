package com.dedalus.d4office.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dedalus.d4office.entity.Desk;
import com.dedalus.d4office.entity.embeddedid.DeskId;

public interface DeskRepository extends JpaRepository<Desk, DeskId> {
	
	@Query(value = "select * from DESKS where office_id = :office", nativeQuery = true)
	public List<Desk> getDeskByOffice(String office);

}
