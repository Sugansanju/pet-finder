package com.pet.portal.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.pet.portal.dto.PetDto;
import com.pet.portal.model.Pet;
import com.pet.portal.repository.PetRepository;
import com.pet.portal.service.PetService;

@RestController
@RequestMapping("/pets")
public class PetController {

	 @Autowired
	    private PetRepository petRepository;
	 
	 @Autowired
	 private PetService petService;
	
	 @Value("${file.storage.location}")
	    private String fileStorageLocation;

	    @GetMapping("/all")
	    public ResponseEntity<?> getAllPets() {
	    	List<Pet> pets=petService.allPets();
	    	System.out.println("===Pets==="+pets.size()+"==="+pets);
	        return ResponseEntity.ok()
	        		.body(pets);
	    }

	    @PostMapping("/add")
	    public ResponseEntity<?> addPet(@RequestBody PetDto petDto) {
	    	 Pet pet = petService.addPet(petDto);
	         return ResponseEntity.ok("Pet Added successFully");
	    }

	    @GetMapping("/{petId}")
	    public Pet getPetById(@PathVariable String petId) {
	        return petRepository.findById(petId).orElse(null);
	    }

	    @PutMapping("/{petId}")
	    public ResponseEntity<?> updatePet(@PathVariable String petId,
	            @RequestParam("name") String name,
	            @RequestParam("description") String description,
	            @RequestParam("lastSeenLocation") String lastSeenLocation,
	            @RequestParam("lastSeenDate") String lastSeenDate,
	            @RequestParam("contactInfo") String contactInfo,
	            @RequestPart("file") MultipartFile imageUrl) {
	    	 try {
	             Pet updatedPet = petService.updatePet(petId, name, description, lastSeenLocation, lastSeenDate, contactInfo, imageUrl);
	            System.out.println("---Updated pet----"+updatedPet);
	             return ResponseEntity.ok(updatedPet);
	         } catch (Exception e) {
	             return ResponseEntity.status(500).body("Error updating pet: " + e.getMessage());
	         }
	    }

	    @DeleteMapping("/{petId}")
	    public void deletePet(@PathVariable String petId) {
	        petRepository.deleteById(petId);
	    }
	    
	    @PostMapping("/upload")
	    public ResponseEntity<?> uploadFile(  @RequestParam("file") MultipartFile file,
	            @RequestParam("name") String name,
	            @RequestParam("description") String description,
	            @RequestParam("lastSeenLocation") String lastSeenLocation,
	            @RequestParam("lastSeenDate") String lastSeenDate,
	            @RequestParam("contactInfo") String contactInfo) {
	    	if (file.isEmpty()) {
				return new ResponseEntity<>("Please select a file!", HttpStatus.OK);
			}
			try {

				byte[] bytes = file.getBytes();

				UUID uuid = UUID.randomUUID();
				String uploadsLocation = "D:\\pet-finder\\backend\\src\\main\\resources\\uploads\\";
				String fileLocation = uploadsLocation + uuid + file.getOriginalFilename();
				Path path = Paths.get(fileLocation);
				Files.write(path, bytes);

				File f = new File(fileLocation);
				return ResponseEntity.status(HttpStatus.OK).body(f.getName());

			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.CREATED).body(e.getMessage());

			}
	    }
	    
	  
}

