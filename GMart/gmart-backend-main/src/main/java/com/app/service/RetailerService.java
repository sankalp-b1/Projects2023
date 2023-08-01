package com.app.service;

import java.util.ArrayList;
import java.util.List;

import com.app.dto.CartProductsDto;
import com.app.dto.RAddressDto;
import com.app.dto.RResponseAddressDto;
import com.app.dto.RetailerDto;
import com.app.dto.RetailerLoginDto;
import com.app.dto.RetailerNAddressDto;
import com.app.entities.Order;
import com.app.entities.RAddress;
import com.app.entities.Retailer;

public interface RetailerService {
	
	boolean existingRetailer(String username);
	
	Retailer addRetailer(RetailerNAddressDto retailerNAddressDto);
	
	boolean validRetailer(RetailerLoginDto retailer);
	
	RAddress addNewAddress(RAddressDto rAddress, Long retailerId);
	
	Long getRetailerIdByUsername(String username);

	List<RResponseAddressDto> listOfSavedAddress(Long retailerId);

	RetailerDto getRetailerDetails(Long retailerId);

	RetailerDto editMyAccount(RetailerDto retailerDto, Long retailerId);

	RAddressDto editAddress(RAddressDto rAddressDto, Long retailerId, Long addressId);

	boolean setDefaultAddress(Long retailerId, Long addressId);

	boolean deleteAddress(Long retailerId, Long addressId);

	boolean deleteAccount(Long retailerid);

	Order createAnOrder(ArrayList<CartProductsDto> products, Long retailerId);

	List<Order> myOrder(Long retailerId);

	String trackOrder(Long orderId);
	
	List<RAddressDto> retailStore(String pincode);


}
