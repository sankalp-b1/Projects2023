package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.FeedbackDTO;
import com.app.service.FeedbackServiceImpl;

@RestController
@CrossOrigin("http://localhost:3000/")
public class FeedbackController {
	@Autowired
	private FeedbackServiceImpl feedbackService;
	
	@PostMapping("/feedback")
	public ResponseEntity<?> createFeedback(@RequestBody @Valid FeedbackDTO feedback){
		return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.addFeedback(feedback));
	}
}
