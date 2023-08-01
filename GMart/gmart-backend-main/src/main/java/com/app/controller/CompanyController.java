package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CompanyDto;
import com.app.service.CompanyService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/company/{companyId}")
public class CompanyController {
	
	@Autowired
	private CompanyService companyService;
	
	@DeleteMapping("/deleteAccount")
	public ResponseEntity<?> deleteAccount(@PathVariable Long companyId) {
		companyService.deleteAccount(companyId);
		return ResponseEntity.status(HttpStatus.OK).body("Account has been successfully deleted");
	}
	
	@GetMapping("/myAccount")
	public ResponseEntity<?> getAccountDetails(@PathVariable Long companyId) {
		return ResponseEntity.status(HttpStatus.OK).body(companyService.getAccountDetails(companyId));
	}
	
	@PutMapping("/myAccount/edit")
	public ResponseEntity<?> editAccountDetails(@RequestBody CompanyDto companyDto,@PathVariable Long companyId) {
		return new ResponseEntity<>(companyService.editAccountDetails(companyDto,companyId),HttpStatus.ACCEPTED);
	}
}
