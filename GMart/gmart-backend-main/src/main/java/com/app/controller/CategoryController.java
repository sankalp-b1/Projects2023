package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Category;
import com.app.service.ImageHandlingService;
import com.app.service.ProductDetailsService;
import com.app.service.RetailerService;

@RestController
@CrossOrigin("http://localhost:3000")
public class CategoryController {
	
	@Autowired
	private ProductDetailsService prodService;

	@Autowired
	private ImageHandlingService imgService;
	
	@Autowired
	private RetailerService retailerService;
	
	@GetMapping("/category/{name}")
	public ResponseEntity<?> registerCompany(@PathVariable Category name ){
		System.out.println("in category controller get method");
		return ResponseEntity.ok().body(prodService.getAllProductsByCategory(name));
	}
	
	@GetMapping(value="/{productId}/image",produces = {MediaType.IMAGE_GIF_VALUE, 
 			MediaType.IMAGE_JPEG_VALUE,
 			MediaType.IMAGE_PNG_VALUE})
	public ResponseEntity<?> showImage(@PathVariable long productId) throws IOException {
		return new ResponseEntity<>(imgService.showProductImage(productId),HttpStatus.OK);
	}
	
	@GetMapping("/retailStore/{pincode}")
	public ResponseEntity<?> retailStore(@PathVariable String pincode) {
		return ResponseEntity.status(HttpStatus.OK).body(retailerService.retailStore(pincode));
	}
}
