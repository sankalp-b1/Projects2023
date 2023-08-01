package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.RAddress;

public interface RetailerAddressRepository extends JpaRepository<RAddress, Long> {
	List<RAddress> findAllByRetailerId(Long retailerId);
	RAddress findByRetailerIdAndIsDefaultIsTrue(Long retailerId);
	Optional<RAddress> findByIdAndIsDefaultIsFalse(Long addressId);
	boolean existsByIdAndIsDefaultIsFalse(Long addressId);
	void deleteByRetailerId(Long retailerid);
	List<RAddress> findAllByPincode(String pincode);

}
