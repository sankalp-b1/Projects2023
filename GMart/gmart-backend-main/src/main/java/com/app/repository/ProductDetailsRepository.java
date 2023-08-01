package com.app.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Category;
import com.app.entities.Company;
import com.app.entities.ProductDetails;

public interface ProductDetailsRepository extends JpaRepository<ProductDetails, Long> {
	
	List<ProductDetails> findAllByCategory(Category category);
	
	List<ProductDetails> findAllProductsByCompanyIdAndIsAvailableIsTrue(Long companyId); //p

	List<ProductDetails> findAllByCompanyIdAndIsAvailableIsTrue(Long companyId, Sort sort); //p

	boolean existsByProductNameAndCompanyAndIsAvailableIsTrue(String productName, Company company); //p

	List<ProductDetails> findAllByCompanyIdAndQuantityAndIsAvailableIsTrue(Long companyId, int i);
	
	void deleteByCompanyId(Long companyId);

}
