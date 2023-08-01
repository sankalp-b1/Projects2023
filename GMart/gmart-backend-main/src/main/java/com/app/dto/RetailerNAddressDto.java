package com.app.dto;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
//@ToString
@AllArgsConstructor
public class RetailerNAddressDto {
	private String fullName;
	private String username;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	private String contactNumber;
	private String email;
	private String alternateMobNumber;
	@JsonProperty("rAddress")
	private Map<String, Object> rAddress;
	
	public RAddressDto getRAddress() {
		RAddressDto address = new RAddressDto();
		address.setShopNo((String) rAddress.get("shopNo"));
		address.setStreetName((String) rAddress.get("streetName"));
		address.setLocality((String) rAddress.get("locality"));
		address.setCity((String) rAddress.get("city"));
		address.setState((String) rAddress.get("state"));
		address.setPincode((String) rAddress.get("pincode"));
		return address;
	}

	@Override
	public String toString() {
		return "RetailerNAddressDto [fullName=" + fullName + ", username=" + username + ", password=" + password
				+ ", contactNumber=" + contactNumber + ", email=" + email + ", alternateMobNumber=" + alternateMobNumber
				+ ", rAddress=" + (rAddress != null ? rAddress.toString() : null) + "]";
	}
	
	
}
