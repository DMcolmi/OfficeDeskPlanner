package com.dedalus.d4office.entity;


import java.sql.Blob;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "offices")
@Entity
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
	private String address;
}
