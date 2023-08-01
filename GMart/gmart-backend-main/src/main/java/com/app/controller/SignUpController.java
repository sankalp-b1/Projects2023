package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CompanyDto;
import com.app.dto.RetailerNAddressDto;
import com.app.service.CompanyServiceImpl;
import com.app.service.RetailerServiceImpl;

@RestController
@RequestMapping("/signup")
@CrossOrigin("http://localhost:3000/")
public class SignUpController {
	
	
	@Autowired
	private RetailerServiceImpl retailerService;
	
	@Autowired
	private CompanyServiceImpl companyService;
	
	@PostMapping("/retailer")
	public ResponseEntity<?> registerRetailer(@RequestBody @Valid RetailerNAddressDto retailer){
		System.out.println("in sign up controller retailer method");
		System.out.println(retailer.toString());
		if(retailerService.existingRetailer(retailer.getUsername())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("");
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(retailerService.addRetailer(retailer));
	}
	

	@PostMapping("/company")
	public ResponseEntity<?> registerCompany(@RequestBody @Valid CompanyDto company){
		System.out.println("in sign up controller company method");
		if(companyService.existsCompanyUsername(company.getUsername())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("");
		}
		if(companyService.existsCompanyName(company.getCompanyName())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("");
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(companyService.addCompany(company));
	}
}
