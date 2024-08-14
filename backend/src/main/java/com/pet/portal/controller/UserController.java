package com.pet.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pet.portal.dto.AuthResponse;
import com.pet.portal.dto.UserDto;
import com.pet.portal.model.User;
import com.pet.portal.security.JwtTokenProvider;
import com.pet.portal.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;
    @PostMapping("/register")
    public void register(@RequestBody UserDto request) {
        userService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtTokenProvider.generateToken(userDetails);
        User user = userService.findByUsername(userDetails.getUsername());

        
        return ResponseEntity.ok(new AuthResponse(user, token));
    }
//    @PostMapping("/login")
//    public String login(@RequestBody UserDto request) {
//        User user = userService.authenticate(request);
//        System.out.println("Controller user-->"+user.getUsername()+"==="+jwtTokenProvider.generateToken(user.getUsername()));
//        return jwtTokenProvider.generateToken(user.getUsername());
//    }
    
    
    @GetMapping("/currentUser")
    public ResponseEntity<User> getCurrentUser() {
    	System.out.println("===CurrentUser====");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("===authentication==="+authentication.getName());
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }
}