package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

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
public class RetailerDto {
	
	private Long id;
	
	private String fullName;
	
	private String username;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	
	private String contactNumber;

	private String email;
	
	private String alternateMobNumber;
	
//	@Embedded
//    @AttributeOverrides({
//    		@AttributeOverride(name = "shopNo", column = @Column(name = "address_shop_no")),
//            @AttributeOverride(name = "streetName", column = @Column(name = "address_street")),
//            @AttributeOverride(name = "locality", column = @Column(name = "address_locality")),
//            @AttributeOverride(name = "city", column = @Column(name = "address_city")),
//            @AttributeOverride(name = "state", column = @Column(name = "address_state")),
//            @AttributeOverride(name = "pincode", column = @Column(name = "address_pin_code"))
//    })
//    private DeliveryAddress address;
}
