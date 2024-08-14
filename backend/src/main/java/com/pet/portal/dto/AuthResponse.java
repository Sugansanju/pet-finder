package com.pet.portal.dto;

import org.springframework.security.core.userdetails.UserDetails;

import com.pet.portal.model.User;

public class AuthResponse {

	 	private User userData;
	    private String token;


		public AuthResponse(User user, String token) {
			this.userData=user;
			this.token=token;
		}
		
		public User getUserData() {
			return userData;
		}

		public void setUserData(User userData) {
			this.userData = userData;
		}

		public String getToken() {
			return token;
		}
		public void setToken(String token) {
			this.token = token;
		}
	    
}
