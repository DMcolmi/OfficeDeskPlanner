package com.dedalus.d4office.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;

import com.dedalus.d4office.entity.embeddedid.DeskId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "desks")
@SecondaryTable(name = "reservations", pkJoinColumns = {
		@PrimaryKeyJoinColumn(name="officeId", referencedColumnName = "officeId"),
		@PrimaryKeyJoinColumn(name="deskNo", referencedColumnName = "deskNo")
})
public class Desk {
	@EmbeddedId
	private DeskId deskId;	
	private Double xPos;	
	private Double yPos;	
	private boolean canBeReserved;
	@Column(table = "reservations")
	private Boolean isReserved;
}
