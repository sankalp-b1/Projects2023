package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;



public interface ImageHandlingService {
	ApiResponse uploadImage(MultipartFile imgFile,Long productId) throws IOException;

	byte[] showProductImage(long productId) throws IOException;
}
