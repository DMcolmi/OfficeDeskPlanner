package com.dedalus.d4office.entity.embeddedId;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class DeskId implements Serializable {		

	private static final long serialVersionUID = 1L;
	
	@Column(nullable = false)		
	private int deskNo;		
	
	@Column(nullable = false)
	private String officeId;		
}
