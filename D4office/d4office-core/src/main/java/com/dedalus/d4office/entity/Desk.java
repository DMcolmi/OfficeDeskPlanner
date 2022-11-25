package com.dedalus.d4office.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.dedalus.d4office.entity.embeddedid.DeskId;

import lombok.Data;

@Data
@Entity
@Table(name = "desks")
public class Desk {
	@EmbeddedId
	private DeskId deskId;	
	private Double xPos;	
	private Double yPos;	
	private boolean canBeReserved;
	@Transient
	private boolean isAvailableForSelectedDays;
}
