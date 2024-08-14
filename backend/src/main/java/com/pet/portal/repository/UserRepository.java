package com.pet.portal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pet.portal.model.User;

public interface UserRepository extends JpaRepository<User, String>{

	@Query(value = "select * from users where username=?1",nativeQuery = true)
	Optional<User> findByUsername(String username);
//
//	@Query(value = "select * from users where username=?1",nativeQuery = true)
//	User findByUsername(String username);

}
