package com.app.dto;
import com.app.entities.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"image1"})
@AllArgsConstructor
public class ProductDetailsDto {
	private Long id;
	private String productName;
	private double mrp;
	private double discount;
	private Category category;
	private String description;
	private int quantity;
	private String image1;
//	private String image2;
//	private String image3;
}
