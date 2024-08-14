package com.pet.portal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pet.portal.dto.UserDto;
import com.pet.portal.model.User;
import com.pet.portal.repository.UserRepository;

@Service
public class UserService {

	@Autowired
    private UserRepository userRepository;

	@Autowired
    private PasswordEncoder passwordEncoder;

    public void register(UserDto request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setContact(request.getContact());
        userRepository.save(user);
    }

    public User authenticate(UserDto request) {
    	System.out.println("UserName--->"+request.getUsername());
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println("===User==="+user);
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}
