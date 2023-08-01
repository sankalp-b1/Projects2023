package com.app.custom_exception;

@SuppressWarnings("serial")
public class RetailerAlreadyPresent extends RuntimeException {
	public RetailerAlreadyPresent(String message) {
		super(message);
	}
}
