package com.app.service;

import com.app.dto.CompanyDto;
import com.app.dto.CompanyLoginDto;
import com.app.entities.Company;

public interface CompanyService {
	Company addCompany(CompanyDto company);
	boolean existsCompanyUsername(String username);
	Long getCompanyIdByUsername(String username);
	boolean validCompany(CompanyLoginDto company);
	void deleteAccount(Long companyId);
	CompanyDto getAccountDetails(Long commpanyId);
	CompanyDto editAccountDetails(CompanyDto companyDto,Long companyId);
	boolean existsCompanyName(String companyName);
	
	

}
