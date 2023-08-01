package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class RAddressDto {
	private Long id;
	private String shopNo;
	private String streetName;
	private String locality;
	private String city;
	private String state;
	private String pincode;
}