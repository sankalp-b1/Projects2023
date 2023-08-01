package com.app.dto;

import com.app.entities.ProductDetails;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CartProductsDto {
	ProductDetails product;
	int quantity;
}
