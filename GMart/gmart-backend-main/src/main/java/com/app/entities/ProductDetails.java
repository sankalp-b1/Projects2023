package com.app.entities;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="product_details")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"image1"})
@AllArgsConstructor
public class ProductDetails extends BaseEntity {
	
	@NotNull(message = "Product name cannot be null")
	@NotBlank(message = "Product name cannot be blank")
	@Column(name="prod_name", nullable = false)
    private String productName;

    @NotNull(message = "MRP cannot be null")
    @DecimalMin(value = "0.01", message = "MRP must be greater than 0")
    private double mrp;

    @DecimalMax(value = "100.00", message = "Discount cannot be greater than 100%")
    @DecimalMin(value = "0.00", message = "Discount cannot be negative")
    private double discount;

    @NotNull(message = "Category cannot be blank")
    @Enumerated(EnumType.STRING)
    private Category category;

    @Min(value = 0, message = "Total number of orders cannot be negative")
    @Column(name="total_orders")
    private int totalNoOfOrders;  //it will be zero by default when the product is added

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @Min(value = 0, message = "Quantity cannot be negative")
    private int quantity;

    private boolean isAvailable = true;
    
    
    private String image1;
    
    @ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "company_id", nullable = false) // FK
   // @JsonProperty(access = Access.WRITE_ONLY)
	private Company company;

	
    
    
    
    
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<ProductList> prodList;
}
