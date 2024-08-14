package com.pet.portal.model;

import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="Users")
public class User {

	 @Id
	 @GeneratedValue(generator = "uuid2")
		@GenericGenerator(name = "uuid2", strategy = "uuid2")
		@Column(name = "userId", updatable = false, nullable = false)
	    private String userId;

	    private String username;
	    private String password;
	    private String email;
	    private String contact;

	    @JsonBackReference
	    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	    private List<Pet> pets;

		public String getUserId() {
			return userId;
		}

		public void setUserId(String userId) {
			this.userId = userId;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getContact() {
			return contact;
		}

		public void setContact(String contact) {
			this.contact = contact;
		}

		public List<Pet> getPets() {
			return pets;
		}

		public void setPets(List<Pet> pets) {
			this.pets = pets;
		}
	    
	    
}
