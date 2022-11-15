package com.dedalus.d4office.entity;


import java.sql.Blob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "offices")
public class Office {	
	
	@Id
	@Column(nullable = false)
	private String officeId;	
	private String officeDesc;	
	private Double xDim;
	private Double yDim;
	private Double yOnXRatio;
	private Double yLenght;
	private Double radiusScaleFactor;
	private Blob officeLogo;
	private Blob officePlan;
}
