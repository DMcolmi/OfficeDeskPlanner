package com.dedalus.d4office.dto;

import java.sql.Blob;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfficeDto {	
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
