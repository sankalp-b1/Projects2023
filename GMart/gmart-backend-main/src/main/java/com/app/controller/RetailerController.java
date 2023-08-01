package com.app.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CartProductsDto;
import com.app.dto.RAddressDto;
import com.app.dto.RetailerDto;
import com.app.service.RetailerService;

@RestController
@RequestMapping("/retailer/{retailerId}")
@CrossOrigin("http://localhost:3000")
public class RetailerController {
	@Autowired
	private RetailerService retailerService;
	
	@GetMapping("/myAccount")
	public ResponseEntity<?> getRetailerDetails(@PathVariable Long retailerId) {
		return ResponseEntity.status(HttpStatus.OK).body(retailerService.getRetailerDetails(retailerId));
	}

	@PutMapping("/myAccount/edit")
	public ResponseEntity<?> editMyAccount(@RequestBody RetailerDto retailerDto, @PathVariable Long retailerId) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(retailerService.editMyAccount(retailerDto, retailerId));
	}
	@PostMapping("/addNewAddress")
	public ResponseEntity<?> addNewAddress(@RequestBody RAddressDto rAddressDto, @PathVariable Long retailerId) {
		System.out.println("In retailer controller to add new address");
		return ResponseEntity.status(HttpStatus.CREATED).body(retailerService.addNewAddress(rAddressDto, retailerId));
	}
	
	@GetMapping("/listOfAddress")
	public ResponseEntity<?> listOfSavedAddress(@PathVariable Long retailerId) {
		return ResponseEntity.status(HttpStatus.CREATED).body(retailerService.listOfSavedAddress(retailerId));
	}
	
	@PutMapping("/address/{addressId}")
	public ResponseEntity<?> editAddress(@RequestBody RAddressDto rAddressDto, @PathVariable Long retailerId, @PathVariable Long addressId) {
		RAddressDto rAddress = retailerService.editAddress(rAddressDto, retailerId, addressId);
		if(rAddress==null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to change given address");
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(rAddress);
	}
	
	@PutMapping("/address/{addressId}/setDefault")
	public ResponseEntity<?> setDefaultAddress(@PathVariable Long retailerId, @PathVariable Long addressId) {
		if(!retailerService.setDefaultAddress(retailerId, addressId)) 
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to save given address as default");
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Default address has been changed");
	}
	
	@DeleteMapping("/address/{addressId}")
	public ResponseEntity<?> deleteAddress(@PathVariable Long retailerId, @PathVariable Long addressId) {
		if(!retailerService.deleteAddress(retailerId, addressId))
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to delete given address or first change default then you can delete it");
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Selected address has been deleted");
	}
	
	@DeleteMapping("/")
	public ResponseEntity<?> deleteAccount(@PathVariable Long retailerId) {
		if(!retailerService.deleteAccount(retailerId))
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authoriized to delete particular retailer");
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Account has been successfully deleted");
	}
	
	@PostMapping("/createAnOrder")
	public ResponseEntity<?> createAnOrder(@RequestBody ArrayList<CartProductsDto> cart, @PathVariable Long retailerId) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(retailerService.createAnOrder(cart, retailerId));
	}
	
	@GetMapping("/myOrder")
	public ResponseEntity<?> myOrder(@PathVariable Long retailerId) {
		return ResponseEntity.status(HttpStatus.OK).body(retailerService.myOrder(retailerId));
	}
	
	@GetMapping("/trackOrder/{orderId}")
	public ResponseEntity<?> trackOrder(@PathVariable Long orderId) {
		return ResponseEntity.status(HttpStatus.OK).body(retailerService.trackOrder(orderId));
	}
}