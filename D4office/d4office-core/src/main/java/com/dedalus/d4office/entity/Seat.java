package com.dedalus.d4office.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "seat")
public class Seat implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@Column(nullable = false)
	private int seatNo;
	
	@Id
	@Column(nullable = false)
	private String office;
	
	@Column
	private Double xPos;
	
	@Column
	private Double yPos;
	

}
