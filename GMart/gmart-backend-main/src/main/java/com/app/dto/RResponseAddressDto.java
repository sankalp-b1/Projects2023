package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
public class RResponseAddressDto {
	private Long id;
	private String shopNo;
	private String streetName;
	private String locality;
	private String city;
	private String state;
	private String pincode;
	private Boolean isDefault;
}