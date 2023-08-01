package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exception.ProductAlreadyPresent;
import com.app.dto.ProductDetailsDto;
import com.app.entities.Category;
import com.app.entities.Company;
import com.app.entities.ProductDetails;
import com.app.repository.CompanyRepository;
import com.app.repository.ProductDetailsRepository;

@Service
@Transactional
public class ProductDetailsServiceImpl implements ProductDetailsService {
	
	@Autowired
	private ProductDetailsRepository productRepo;
	

	@Autowired
	private CompanyRepository companyRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public List<ProductDetails>getAllProductsByCategory(Category category) {
		
		return productRepo.findAllByCategory(category);
	}

	
	@Override
	// 1 ->
	//get all products by company id and check whether isAvailable is true or not
	public List<ProductDetailsDto> getAllProductsByCompanyId(Long companyId) {
		List<ProductDetails> products = productRepo.findAllProductsByCompanyIdAndIsAvailableIsTrue(companyId);
		return products.stream().map(product -> modelMapper.map(product, ProductDetailsDto.class)).collect(Collectors.toList());
	}
	
	//2 ->
	//adding a new product
	public ProductDetails addProduct(ProductDetailsDto productDetailsDto, Long companyId) {
		Company company = companyRepository.findById(companyId).get();
		String productName = productDetailsDto.getProductName();
		
		//Check if a product with the same name already exists for the given company and isAvailable is true
		if(productRepo.existsByProductNameAndCompanyAndIsAvailableIsTrue(productName, company))
			throw new ProductAlreadyPresent("Product with name "+productName+" already exists for company "+company.getCompanyName());
		ProductDetails productDetails = new ProductDetails();
		
		productDetails.setProductName(productName);
		productDetails.setAvailable(true);
		productDetails.setCategory(productDetailsDto.getCategory());
		productDetails.setCompany(company);
		productDetails.setDescription(productDetailsDto.getDescription());
		productDetails.setDiscount(productDetailsDto.getDiscount());
		productDetails.setImage1(productDetailsDto.getImage1());
		productDetails.setMrp(productDetailsDto.getMrp());
		productDetails.setQuantity(productDetailsDto.getQuantity());
		productDetails.setTotalNoOfOrders(0);
		
		//Save the new product
		return productRepo.save(productDetails);
	}
	
	//3 ->
	//deleting a product
	//actually we are not deleting any product instead we are making their isAvailable to false
	@Override
	public boolean deleteAProduct(Long productId) {
		if(productRepo.existsById(productId)) {
			Optional<ProductDetails> productOptional = productRepo.findById(productId);
			ProductDetails product = productOptional.get();
			product.setAvailable(false);
			product.setQuantity(0);
			productRepo.save(product);
			return true;
		}
		return false;
	}
	
//	//4 ->
//	//same as 1 but sorting products by name
//	@Override
//	public List<ProductDetailsDto> getAllProductsByCompanyIdByName(Long companyId) {
//		Sort sort = Sort.by("productName").ascending();
//		List<ProductDetails> products = productRepo.findAllByCompanyIdAndIsAvailableIsTrue(companyId, sort);
//		return products.stream().map(product -> modelMapper.map(product, ProductDetailsDto.class)).collect(Collectors.toList());
//	}
//	
	//5 ->
	//check whose quantity is 0
	@Override
	public List<ProductDetailsDto> getAllOutOfStockProducts(Long companyId) {
		List<ProductDetails> products = productRepo.findAllByCompanyIdAndQuantityAndIsAvailableIsTrue(companyId, 0);
		return products.stream().map(product -> modelMapper.map(product, ProductDetailsDto.class)).collect(Collectors.toList());
	}
	
	

	@Override
	public void updateProduct(ProductDetailsDto productDto, Long productId) {
		ProductDetails product = productRepo.findById(productId).get();
		product.setDescription(productDto.getDescription());
		product.setDiscount(productDto.getDiscount());
		product.setImage1(productDto.getImage1());
//		product.setImage2(productDto.getImage2());
//		product.setImage3(productDto.getImage3());
		product.setMrp(productDto.getMrp());
		product.setQuantity(productDto.getQuantity());
		productRepo.save(product);
	}

}
