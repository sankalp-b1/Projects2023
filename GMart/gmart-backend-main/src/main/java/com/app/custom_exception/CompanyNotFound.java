package com.app.custom_exception;

@SuppressWarnings("serial")
public class CompanyNotFound extends RuntimeException {
	public CompanyNotFound(String message) {
		super(message);
	}
}
