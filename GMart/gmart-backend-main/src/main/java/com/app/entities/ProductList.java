package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "product_list")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
public class ProductList extends BaseEntity {
	
	@NotNull(message = "Quantity cannot be null.")
    @Min(value = 1, message = "Quantity must be at least 1.")
    private Integer quantity;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false) // FK
	private ProductDetails product;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false) // FK
	private Order order;
}
