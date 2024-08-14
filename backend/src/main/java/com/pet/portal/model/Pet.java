package com.pet.portal.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name="Pets")
public class Pet {

	
	 	@Id
	 	@GeneratedValue(generator = "uuid2")
		@GenericGenerator(name = "uuid2", strategy = "uuid2")
		@Column(name = "petId", updatable = false, nullable = false)
	    private String petId;
	    
	    private String name;
	    private String description;
	    private String lastSeenLocation;
	    private LocalDate lastSeenDate;
	    private String contactInfo;
	    private String imageUrl;

	    @JsonManagedReference
	    @ManyToOne
	    @JoinColumn(name = "userId", nullable = false) // This will create the foreign key column
	    private User user;
	    
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


		

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public String getContactInfo() {
			return contactInfo;
		}

		public void setContactInfo(String contactInfo) {
			this.contactInfo = contactInfo;
		}
	    
	    
}
