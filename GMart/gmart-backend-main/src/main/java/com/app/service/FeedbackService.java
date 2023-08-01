package com.app.service;

import com.app.dto.FeedbackDTO;
import com.app.entities.Feedback;

public interface FeedbackService {
	Feedback addFeedback(FeedbackDTO feedback);
}
