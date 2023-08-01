package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.ProductList;

public interface ProductListRepository extends JpaRepository<ProductList, Long> {

}
