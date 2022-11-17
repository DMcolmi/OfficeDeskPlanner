package com.dedalus.d4office.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.dedalus.d4office.entity.embeddedId.DeskId;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "desks")
public class Desk {	

	@EmbeddedId
	private DeskId deskId;
	
	@Column
	private Double xPos;
	
	@Column
	private Double yPos;
	
	@Column
	private boolean canBeReserved;
	
	@Transient
	private boolean isAvailableForSelectedDays;	

}
