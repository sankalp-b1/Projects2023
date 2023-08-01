package com.app.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.CartProductsDto;
import com.app.dto.RAddressDto;
import com.app.dto.RResponseAddressDto;
import com.app.dto.RetailerDto;
import com.app.dto.RetailerLoginDto;
import com.app.dto.RetailerNAddressDto;
import com.app.entities.Order;
import com.app.entities.OrderStatus;
import com.app.entities.ProductDetails;
import com.app.entities.ProductList;
import com.app.entities.RAddress;
import com.app.entities.Retailer;
import com.app.repository.OrderRepository;
import com.app.repository.ProductDetailsRepository;
import com.app.repository.ProductListRepository;
import com.app.repository.RetailerAddressRepository;
import com.app.repository.RetailerRepository;

@Service
@Transactional
public class RetailerServiceImpl implements RetailerService{
	
	@Autowired
	private RetailerRepository retailerRepo;
	@Autowired
	private RetailerAddressRepository rAddressRepo;
	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private ProductDetailsRepository productRepo;
	@Autowired
	private ProductListRepository productListRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	
	@Override
	public Retailer addRetailer(RetailerNAddressDto retailerNAddressDto) {
		System.out.println("Reached in service layer to add a retailer");
		System.out.println(retailerNAddressDto.toString());
//		RetailerDto retailerDto = retailerNAddressDto.getRetailer();
		RAddressDto rAddressDto = retailerNAddressDto.getRAddress();
//		System.out.println(retailerNAddressDto.getRAddress().toString());
		Retailer retailer = new Retailer();
		retailer.setFullName(retailerNAddressDto.getFullName());
		retailer.setUsername(retailerNAddressDto.getUsername());
		retailer.setPassword(retailerNAddressDto.getPassword());
		retailer.setContactNumber(retailerNAddressDto.getContactNumber());
		retailer.setEmail(retailerNAddressDto.getEmail());
		retailer.setAlternateMobNumber(retailerNAddressDto.getAlternateMobNumber());
		
		RAddress rAddress = new RAddress();
		rAddress.setCity(rAddressDto.getCity());
		rAddress.setIsDefault(true);
		rAddress.setLocality(rAddressDto.getLocality());
		rAddress.setPincode(rAddressDto.getPincode());
		rAddress.setShopNo(rAddressDto.getShopNo());
		rAddress.setState(rAddressDto.getState());
		rAddress.setStreetName(rAddressDto.getStreetName());
		retailer = retailerRepo.save(retailer);
		System.out.println(retailer);
		System.out.println(rAddressDto);
		rAddress.setRetailer(retailer);
		rAddressRepo.save(rAddress);
		return retailer;
	}

	@Override
	public boolean validRetailer(RetailerLoginDto retailer) {
		if(retailerRepo.existsByUsernameAndPassword(retailer.getUsername(), retailer.getPassword())) {
			return true;
		}
		return false;
	}

	@Override
	public RAddress addNewAddress(RAddressDto rAddressDto, Long retailerId) {
		System.out.println("service layer for adding new address");
		RAddress address = new RAddress();
		Retailer retailer = new Retailer();
		retailer = retailerRepo.findById(retailerId).get();
		address.setCity(rAddressDto.getCity());
		address.setLocality(rAddressDto.getLocality());
		address.setPincode(rAddressDto.getPincode());
		address.setRetailer(retailer);
		address.setShopNo(rAddressDto.getShopNo());
		address.setState(rAddressDto.getState());
		address.setStreetName(rAddressDto.getStreetName());
		address.setIsDefault(false);
		return rAddressRepo.save(address);
	}

	@Override
	public Long getRetailerIdByUsername(String username) {
		Retailer retailer = retailerRepo.findByUsername(username);
		return retailer.getId();
	}

	@Override
	public List<RResponseAddressDto> listOfSavedAddress(Long retailerId) {
		List<RAddress> addresses = rAddressRepo.findAllByRetailerId(retailerId);
		System.out.println(addresses);
		return addresses.stream().map(address -> modelMapper.map(address, RResponseAddressDto.class)).collect(Collectors.toList());
	}

	@Override
	public RetailerDto getRetailerDetails(Long retailerId) {
		Retailer retailer = retailerRepo.findById(retailerId).get();
		RetailerDto retailerDto = modelMapper.map(retailer, RetailerDto.class);
		return retailerDto;
	}

	@Override
	public RetailerDto editMyAccount(RetailerDto retailerDto, Long retailerId) {
		Retailer retailer = retailerRepo.findById(retailerId).get();
		retailer.setAlternateMobNumber(retailerDto.getAlternateMobNumber());
		retailer.setContactNumber(retailerDto.getContactNumber());
		retailer.setEmail(retailerDto.getEmail());
		retailer.setFullName(retailerDto.getFullName());
		retailer.setPassword(retailerDto.getPassword());
		return modelMapper.map(retailerRepo.save(retailer), RetailerDto.class);
	}

	@Override
	public RAddressDto editAddress(RAddressDto rAddressDto, Long retailerId, Long addressId) {
		RAddress rAddress = rAddressRepo.findById(addressId).get();
		System.out.println(rAddress);
		if(rAddress.getRetailer().getId()!=retailerId)
			return null;
		rAddress.setCity(rAddressDto.getCity());
		rAddress.setLocality(rAddressDto.getLocality());
		rAddress.setPincode(rAddressDto.getPincode());
		rAddress.setShopNo(rAddressDto.getShopNo());
		rAddress.setState(rAddressDto.getState());
		rAddress.setStreetName(rAddressDto.getStreetName());
		return modelMapper.map(rAddressRepo.save(rAddress), RAddressDto.class);
	}

	@Override
	public boolean setDefaultAddress(Long retailerId, Long addressId) {
		System.out.println("In service layer to set as default address");
		RAddress rAddress = rAddressRepo.findById(addressId).get();
		System.out.println(rAddress);
		if(rAddress.getRetailer().getId()!=retailerId)
			return false;
		RAddress defRAddress = rAddressRepo.findByRetailerIdAndIsDefaultIsTrue(retailerId);
		defRAddress.setIsDefault(false);
		rAddressRepo.save(defRAddress);
		rAddress.setIsDefault(true);
		rAddressRepo.save(rAddress);
		return true;
	}

	@Override
	public boolean deleteAddress(Long retailerId, Long addressId) {
		System.out.println("In service layer to delete a address");
		if(!rAddressRepo.existsByIdAndIsDefaultIsFalse(addressId))
			return false;
		RAddress rAddress = rAddressRepo.findByIdAndIsDefaultIsFalse(addressId).get();
		if(rAddress.getRetailer().getId()!=retailerId)
			return false;
		rAddressRepo.deleteById(addressId);
		return true;
	}

	@Override
	public boolean deleteAccount(Long retailerId) {
		if(!retailerRepo.existsById(retailerId))
			return false;
		rAddressRepo.deleteByRetailerId(retailerId);
		orderRepo.deleteByRetailerId(retailerId);
		retailerRepo.deleteById(retailerId);
		return true;
	}

	@Override
	public Order createAnOrder(ArrayList<CartProductsDto> productList, Long retailerId) {
		int totalQuantity = 0;
		double totalPrice = 0;
		for(int i=0; i<productList.size(); i++) {
			int quantity = productList.get(i).getQuantity();
			totalQuantity += quantity;
			ProductDetails product = productList.get(i).getProduct();
			product.setQuantity(product.getQuantity()-quantity);
			product.setTotalNoOfOrders(product.getTotalNoOfOrders()+1);
			productRepo.save(product);
			double price = (product.getMrp()*(100-product.getDiscount()))/100;
			totalPrice += price*quantity;
		}
		Order order = new Order();
		order.setEstimatedDeliveryDate(LocalDate.now().plusDays(5));
		order.setOrderStatus(OrderStatus.CREATED);
		order.setTotalPrice(totalPrice);
		order.setTotalQuantity(totalQuantity);
		
		order.setRetailer(retailerRepo.findById(retailerId).get());
		order = orderRepo.save(order);
		for(int i=0; i<productList.size(); i++) {
			ProductList addProduct = new ProductList();
			addProduct.setOrder(order);
			addProduct.setQuantity(productList.get(i).getQuantity());
			addProduct.setProduct(productList.get(i).getProduct());
			productListRepo.save(addProduct);
		}
		return order;
	}
	
	public Order updateOrderStatus(Order order) {
		long diff = ChronoUnit.DAYS.between(order.getOrderDate(), LocalDate.now());
		if(diff==1)
			order.setOrderStatus(OrderStatus.SHIPPED);
		else if(diff==2)
			order.setOrderStatus(OrderStatus.IN_TRANSIT);
		else if(diff>=5 && order.getEstimatedDeliveryDate()!=null) {
			order.setOrderStatus(OrderStatus.DELIVERED);
			order.setDeliveryDate(order.getEstimatedDeliveryDate());
			order.setEstimatedDeliveryDate(null);
		}
		return order;
	}
	
	@Override
	public List<Order> myOrder(Long retailerId) {
		System.out.println(retailerId);
		List<Order> orders = orderRepo.findAllByRetailerId(retailerId);
		System.out.println(orders);
		for(int i=0; i<orders.size(); i++) {
			Order order = orders.get(i);
			order = updateOrderStatus(order);
			orderRepo.save(order);
		}
		return orders;
	}

	@Override
	public String trackOrder(Long orderId) {
		Order order = orderRepo.findById(orderId).get();
		order = updateOrderStatus(order);
		return order.getOrderStatus().toString();
	}

	@Override
	public boolean existingRetailer(String username) {
		if(retailerRepo.existsByUsername(username)) {
			return true;
		}
		return false;
	}
	
	@Override
	public List<RAddressDto> retailStore(String pincode) {
		List<RAddress> addresses = rAddressRepo.findAllByPincode(pincode);
		return addresses.stream().map(address -> modelMapper.map(address, RAddressDto.class)).collect(Collectors.toList());
	}

}
