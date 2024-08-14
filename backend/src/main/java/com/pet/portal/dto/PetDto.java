package com.pet.portal.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class PetDto {

	 private String petId;
	    
	    private String name;
	    private String description;
	    private String lastSeenLocation;
	    private LocalDate lastSeenDate;
	    private String contactInfo;
	    private String imageUrl;
	    private String userId;
		public String getPetId() {
			return petId;
		}
		public void setPetId(String petId) {
			this.petId = petId;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public String getLastSeenLocation() {
			return lastSeenLocation;
		}
		public void setLastSeenLocation(String lastSeenLocation) {
			this.lastSeenLocation = lastSeenLocation;
		}
		
		public LocalDate getLastSeenDate() {
			return lastSeenDate;
		}
		public void setLastSeenDate(LocalDate lastSeenDate) {
			this.lastSeenDate = lastSeenDate;
		}
		public String getImageUrl() {
			return imageUrl;
		}
		public void setImageUrl(String imageUrl) {
			this.imageUrl = imageUrl;
		}
		public String getContactInfo() {
			return contactInfo;
		}
		public void setContactInfo(String contactInfo) {
			this.contactInfo = contactInfo;
		}
		public String getUserId() {
			return userId;
		}
		public void setUserId(String userId) {
			this.userId = userId;
		}
		
	    
	    
	    
}
