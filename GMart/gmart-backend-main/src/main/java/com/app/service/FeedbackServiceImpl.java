package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.FeedbackDTO;
import com.app.entities.Feedback;
import com.app.repository.FeedbackRepository;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {
	@Autowired
	private FeedbackRepository feedbackRepo;
	@Override
	public Feedback addFeedback(FeedbackDTO feedbackdto) {
		Feedback feedback=new Feedback();
		feedback.setName(feedbackdto.getName());
		feedback.setDescription(feedbackdto.getDescription());
		feedback.setEmailId(feedbackdto.getEmailId());
		feedback.setPhoneNo(feedbackdto.getPhoneNo());
		feedback.setRole(feedbackdto.getRole());
		feedback.setRating(feedbackdto.getRating());
		return feedbackRepo.save(feedback);
	}

}
