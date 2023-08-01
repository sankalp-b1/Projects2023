package com.app.controller;

import java.io.IOException;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ProductDetailsDto;
import com.app.entities.Category;
import com.app.entities.ProductDetails;
import com.app.service.ImageHandlingService;
import com.app.service.ProductDetailsService;

@RestController
@RequestMapping("/")
@CrossOrigin("http://localhost:3000/")
public class ProductDetailsController {
	@Autowired
	private ProductDetailsService productDetailsService;
	
	@Autowired
	private ImageHandlingService imgService;
	
	//1 to 5 -> for company
	//1 ->
	@GetMapping("company/{companyId}/")
	public List<?> getAllProductsByCompanyId(@PathVariable Long companyId) {
		System.out.println("----------------Company Id = "+companyId);
		return productDetailsService.getAllProductsByCompanyId(companyId);
	}
	
	//2 ->
	@PostMapping("company/{companyId}/add")
	public ResponseEntity<?> addProduct(@RequestBody ProductDetailsDto productDetailsDto, @PathVariable Long companyId) {
		ProductDetails product = productDetailsService.addProduct(productDetailsDto, companyId);
		return new ResponseEntity<>(product, HttpStatus.CREATED);
	}
	
	//3 ->
	@DeleteMapping("company/{companyId}/product/{productId}")
	public ResponseEntity<?> deleteAProduct(@PathVariable Long productId) {
		boolean isDeleted = productDetailsService.deleteAProduct(productId);
		if(isDeleted) {
			return new ResponseEntity<>("Product with ID "+productId+" deleted successfully", HttpStatus.OK);
		}
		return new ResponseEntity<>("Failed to delete product with ID " + productId+" because it is not present.", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping("company/{companyId}/product/{productId}")
	public ResponseEntity<?> updateProduct(@RequestBody ProductDetailsDto productDto, @PathVariable Long productId) {
		productDetailsService.updateProduct(productDto, productId);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Prduct Details has been updated successfully");
	}
	
//	//4 ->
//	@GetMapping("company/{companyId}/sortByName")
//	public List<?> getAllProductsByCompanyIdByName(@PathVariable Long companyId) {
//		return productDetailsService.getAllProductsByCompanyIdByName(companyId);
//	}
	
	//5 ->
	@GetMapping("company/{companyId}/outOfStock")
	public List<?> getAllOutOfStockProducts(@PathVariable Long companyId) {
		System.out.println("----------------Company Id = "+companyId+" Quantity = 0");
		return productDetailsService.getAllOutOfStockProducts(companyId);
	}
	
	@PostMapping(value="company/{companyId}/{productId}/image", consumes="multipart/form-data")
	public ResponseEntity<?> uploadImage(@RequestParam MultipartFile image,@PathVariable Long productId) 
			throws IOException{
		System.out.println("in upload img " + productId + " " + image.getOriginalFilename());
		return new ResponseEntity<>(imgService.uploadImage(image,productId),HttpStatus.CREATED);
	}
	
	@GetMapping("retailer/{retailerId}/category/{name}")
	public ResponseEntity<?> getAllProductsByCategory(@PathVariable Long retailerId, @PathVariable Category name) {
		return ResponseEntity.ok().body(productDetailsService.getAllProductsByCategory(name));
	}
	
}