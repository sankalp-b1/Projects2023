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

import com.app.dto.CompanyLoginDto;
import com.app.dto.RetailerLoginDto;
import com.app.service.CompanyServiceImpl;
import com.app.service.RetailerServiceImpl;

@RestController
@RequestMapping("/login")
@CrossOrigin("http://localhost:3000/")
public class LoginController {
	
	@Autowired
	private RetailerServiceImpl retailerService;

	
	@Autowired
	private CompanyServiceImpl companyService;
	
	@PostMapping("/retailer")
	public ResponseEntity<?> loginRetailer(@RequestBody @Valid RetailerLoginDto retailer){
		System.out.println("in login controller retailer method");
		System.out.println(retailer.getUsername() + " " + retailer.getPassword());
		if(!retailerService.validRetailer(retailer))
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username and password");
		Long retailerId = retailerService.getRetailerIdByUsername(retailer.getUsername());
		return ResponseEntity.ok().body(retailerId);
	}
	
	@PostMapping("/company")
	public ResponseEntity<?> loginCompany(@RequestBody @Valid CompanyLoginDto company){
		System.out.println("in login controller company method");
		System.out.println(company.getUsername() + " " + company.getPassword());
		if(!companyService.validCompany(company))
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username and password");
		Long companyId = companyService.getCompanyIdByUsername(company.getUsername());
		return ResponseEntity.ok().body(companyId);
	}
	
}
