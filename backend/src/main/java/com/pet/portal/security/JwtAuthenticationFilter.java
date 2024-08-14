package com.pet.portal.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }
   	  public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    	            throws IOException, ServletException {

    	        String token = request.getHeader("Authorization");
    	        if (token != null && token.startsWith("Bearer ")) {
    	            token = token.substring(7);
    	            if (jwtTokenProvider.validateToken(token)) {
    	                String username = jwtTokenProvider.getUsername(token);
    	                System.out.println("Valid token for user: " + username);
    	                SecurityContextHolder.getContext().setAuthentication(jwtTokenProvider.getAuthentication(token));
    	            } else {
    	                System.out.println("Invalid token");
    	            }
    	        } else {
    	            System.out.println("No token found");
    	        }

    	        chain.doFilter(request, response);
    	    }
}