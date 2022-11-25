package com.dedalus.d4office.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dedalus.d4office.entity.Office;

public interface OfficeRepository extends JpaRepository<Office, String> {

}
