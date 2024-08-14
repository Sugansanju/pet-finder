package com.pet.portal.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pet.portal.dto.PetDto;
import com.pet.portal.model.Pet;
import com.pet.portal.model.User;
import com.pet.portal.repository.PetRepository;
import com.pet.portal.repository.UserRepository;

@Service
public class PetService {

	 @Autowired
	    private PetRepository petRepository;

	 @Autowired
	    private UserRepository userRepository;
	 
	    public Pet addPet(PetDto petDto) {
	    	 Pet pet = new Pet();
	         pet.setName(petDto.getName());
	         pet.setDescription(petDto.getDescription());
	         pet.setLastSeenLocation(petDto.getLastSeenLocation());
	         pet.setLastSeenDate(petDto.getLastSeenDate());
	         pet.setContactInfo(petDto.getContactInfo());
	         pet.setImageUrl(petDto.getImageUrl());
	         // Fetch the user entity from the database using userId
	         User user = userRepository.findById(petDto.getUserId())
	                 .orElseThrow(() -> new RuntimeException("User not found"));
	         pet.setUser(user);
	         return petRepository.save(pet);
	    }

	    public List<Pet> getPetsByUser(String userId) {
	        return petRepository.findByUserId(userId);
	    }

	    public Pet getPetById(String petId) {
	        return petRepository.findById(petId).orElseThrow(() -> new RuntimeException("Pet not found"));
	    }
	    
//	    public Pet updatePet(String petId, Pet pet) {
//	        Pet existingPet = getPetById(petId);
//	        existingPet.setName(pet.getName());
//	        existingPet.setDescription(pet.getDescription());
//	        return petRepository.save(existingPet);
//	    }

	    public void deletePet(String petId) {
	        petRepository.deleteById(petId);
	    }

		public List<Pet> allPets() {
			return petRepository.findAllPets();
		}

		public Pet updatePet(String petId, String name, String description, String lastSeenLocation,
				String lastSeenDate, String contactInfo, MultipartFile imageUrl) throws IOException {
			 Pet pet = petRepository.findById(petId)
		                .orElseThrow(() -> new RuntimeException("Pet not found"));

		        pet.setName(name);
		        pet.setDescription(description);
		        pet.setLastSeenLocation(lastSeenLocation);
		        pet.setLastSeenDate(LocalDate.parse(lastSeenDate));
		        pet.setContactInfo(contactInfo);

		        // If a new image is uploaded, save it and update the pet's image URL
		        if (imageUrl != null && !imageUrl.isEmpty()) {
		        	byte[] bytes = imageUrl.getBytes();

					UUID uuid = UUID.randomUUID();
					String uploadsLocation = "D:\\backend\\portal\\src\\main\\resources\\uploads\\";
					String fileLocation = uploadsLocation + uuid + imageUrl.getOriginalFilename();
					Path path = Paths.get(fileLocation);
					Files.write(path, bytes);

					File f = new File(fileLocation);
		            pet.setImageUrl(f.getName());
		        }

		        return petRepository.save(pet);
		}
	
}
