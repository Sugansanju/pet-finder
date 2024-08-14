package com.pet.portal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pet.portal.model.Pet;

public interface PetRepository extends JpaRepository<Pet, String>{

	@Query(value="select * from pets where userId=?1",nativeQuery=true)
	List<Pet> findByUserId(String userId);

	@Query(value="select * from pets where pet_id=?1",nativeQuery = true)
	Optional<Pet> findById(String petId);

	@Query(value="select * from pets",nativeQuery = true)
	List<Pet> findAllPets();


}
