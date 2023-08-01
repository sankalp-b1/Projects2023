package com.app.dto;

import com.app.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class FeedbackDTO {
	 private String name;
	 private String emailId;
	 private String phoneNo;
	 private Role role;
	 private int rating;
	 private String description;
}
