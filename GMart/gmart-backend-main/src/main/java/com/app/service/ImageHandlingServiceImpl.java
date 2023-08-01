package com.app.service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exception.ProductNotFoundException;
import com.app.custom_exception.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.entities.ProductDetails;
import com.app.repository.ProductDetailsRepository;



@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {
	
	@Value("${content.upload.folder}")
	private String folderName;
	
	@Autowired
	private ProductDetailsRepository productDetailsRepo;
	
	@PostConstruct
	public void myInit() {
		File file= new File(folderName);
		
		if(!file.exists()) {
			file.mkdirs();
		}
	}
	
	@Override
	public ApiResponse uploadImage(MultipartFile imgFile, Long productId) throws IOException {
		
		ProductDetails productDetails=productDetailsRepo.findById(productId)
				.orElseThrow(()->new ProductNotFoundException("product doesn't exist ,image can't be uploaded"));
		
		String imgPath=folderName + File.separator + imgFile.getOriginalFilename();
		System.out.println("image path in uploadImage is: "+imgPath);
		Files.copy(imgFile.getInputStream(), Paths.get(imgPath), StandardCopyOption.REPLACE_EXISTING);
				
		productDetails.setImage1(imgPath);
		System.out.println(productDetails.getImage1());
		
		return new ApiResponse("image uploaded successfully");
	}

	@Override
	public byte[] showProductImage(long productId) throws IOException {
		ProductDetails productDetails=productDetailsRepo.findById(productId)
				.orElseThrow(()->new ProductNotFoundException("product doesn't exist ,image can't be uploaded"));
		
		String imgPath=productDetails.getImage1();
		System.out.println("image path is: "+imgPath);
		if(imgPath==null) 
			throw new ResourceNotFoundException("img1 path can not be found!!!");
		return Files.readAllBytes(Paths.get(imgPath));
	}
	
}
