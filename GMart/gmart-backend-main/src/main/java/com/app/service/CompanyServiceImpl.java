package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exception.RetailerAlreadyPresent;
import com.app.dto.CompanyDto;
import com.app.dto.CompanyLoginDto;
import com.app.entities.Company;
import com.app.repository.CompanyRepository;
import com.app.repository.ProductDetailsRepository;

@Service
@Transactional
public class CompanyServiceImpl implements CompanyService{
	@Autowired
	private CompanyRepository companyRepo;
	
	@Autowired
	private ProductDetailsRepository productRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public Company addCompany(CompanyDto company) {
		
		System.out.println("in company service method add company");
		Company user = new Company();
		user.setUsername(company.getUsername());
		user.setCompanyName(company.getCompanyName());
		user.setPassword(company.getPassword());
		user.setContactNumber(company.getContactNumber());
		user.setAlternateMobNumber(company.getAlternateMobNumber());
		user.setEmail(company.getEmail());
		user.setAddress(company.getAddress());
		if(companyRepo.existsByUsername(user.getUsername())) {
			throw new RetailerAlreadyPresent("Company Already Present!!!");
		}
		return companyRepo.save(user);
	}

	@Override
	public boolean validCompany(CompanyLoginDto company) {
		if(companyRepo.existsByUsernameAndPassword(company.getUsername(), company.getPassword())) {
			return true;
		}
		return false;
	}
	
	@Override
	public Long getCompanyIdByUsername(String username) {
		Company company = companyRepo.findByUsername(username);
		return company.getId();
	}

	@Override
	public void deleteAccount(Long companyId) {
		productRepo.deleteByCompanyId(companyId);
		companyRepo.deleteById(companyId);		
	}

	@Override
	public CompanyDto getAccountDetails(Long commpanyId) {
		return modelMapper.map(companyRepo.findById(commpanyId), CompanyDto.class);
	}

	@Override
	public CompanyDto editAccountDetails(CompanyDto companyDto,Long companyId) {
		Company company=companyRepo.findById(companyId).get();
		
		company.setAddress(companyDto.getAddress());
		company.setAlternateMobNumber(companyDto.getAlternateMobNumber());
		company.setCompanyName(companyDto.getCompanyName());
		company.setContactNumber(companyDto.getContactNumber());
		company.setEmail(companyDto.getEmail());
		company.setPassword(companyDto.getPassword());
		
		return modelMapper.map(companyRepo.save(company), CompanyDto.class);
	}

	@Override
	public boolean existsCompanyUsername(String username) {
		if(companyRepo.existsByUsername(username)) {
			return true;
		}
		return false;
	}

	@Override
	public boolean existsCompanyName(String companyName) {
		if(companyRepo.existsByCompanyName(companyName)) {
			return true;
		}
		return false;
	}

	
}
