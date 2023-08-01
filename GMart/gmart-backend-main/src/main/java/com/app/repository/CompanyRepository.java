package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
	boolean existsByUsername(String username);
	
	boolean existsByUsernameAndPassword(String username, String password);
	
	Company findByUsername(String username);
	
	boolean existsByCompanyName(String companyName);
}
