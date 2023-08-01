package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Retailer_tbl")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "password")
public class Retailer extends BaseEntity{
	@NotBlank(message = "Full name cannot be blank")
	@NotNull(message = "Enter valid name")
	@Column(name = "full_name", length = 20)
	@Length(min = 4, max = 20, message="Number of characters in name field should be between 4 to 20")
	private String fullName;
	
	
	@NotBlank(message = "Username cannot be empty")
	@NotNull(message = "Username cannot be empty")
	@Size(min = 6, max = 40)
	@Pattern(regexp = "^[a-zA-Z][-a-zA-Z0-9_]*$")
	@Column(unique = true)
	private String username;
	
	@Column(length = 100)
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	
	@NotNull
	@NotBlank
	@Size(min=10, max=10)
	@Pattern(regexp = "^[1-9]\\d{9}$")
	@Column(name = "mob_no", length = 10)
	private String contactNumber;
	
	@NotNull
	@NotBlank
	@Column(length = 40)
	@Email(message = "Invalid email format")
	private String email;
	
	@Column(name = "Alternate_Mobile_Number")
	@Size(min=10, max = 10)
	@Pattern(regexp = "^[1-9]\\d{9}$")
	private String alternateMobNumber;
	
//	
//	private String deliveryAddressShopNo;
//	private String deliveryAddressStreet;
//    private String deliveryAddressLocality;
//    private String deliveryAddressCity;
//    private String deliveryAddressState;
//    private String deliveryAddressPinCode;
    
    
	
	 
	
	public Retailer(
			@NotBlank(message = "Full name cannot be blank") @NotNull(message = "Enter valid name") @Length(min = 4, max = 20, message = "Number of characters in name field should be between 3 to 20") String fullName,
			@NotBlank(message = "Username cannot be empty") @NotNull(message = "Username cannot be empty") @Size(min = 6, max = 40) @Pattern(regexp = "^[a-zA-Z][-a-zA-Z0-9_]*$") String username,
			String password,
			@NotNull @NotBlank @Size(min = 10, max = 10) @Pattern(regexp = "^[1-9]\\d{9}$") String contactNumber,
			@NotNull @NotBlank @Email(message = "Invalid email format") String email,
			@Size(min = 10, max = 10) @Pattern(regexp = "^[1-9]\\d{9}$") String alternateMobNumber) {
		super();
		this.fullName = fullName;
		this.username = username;
		this.password = password;
		this.contactNumber = contactNumber;
		this.email = email;
		this.alternateMobNumber = alternateMobNumber;
	}

//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "retailer",cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<RAddress> rAddrList;
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "retailer",cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<Order> orderList;
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "retailer",cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<Cart> cartItemsList;
	

}
