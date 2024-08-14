package com.pet.portal.security;

import java.security.Key;
import java.util.Collections;
import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

	  private final SecretKey secretKey;

	    public JwtTokenProvider() {
	        this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
	    }

	    public String generateToken(UserDetails userDetails) {
	        return Jwts.builder()
	                .setSubject(userDetails.getUsername())
	                .signWith(secretKey)
	                .compact();
	    }

	    public Claims getClaims(String token) {
	        return Jwts.parser()
	                .setSigningKey(secretKey)
	                .parseClaimsJws(token)
	                .getBody();
	    }

	    public String getUsername(String token) {
	        return getClaims(token).getSubject();
	    }

	    public boolean isTokenExpired(String token) {
	        return getClaims(token).getExpiration().before(new Date());
	    }

	    public boolean validateToken(String token) {
	        return !isTokenExpired(token);
	    }

	    public Authentication getAuthentication(String token) {
	        // Implement the method to return an Authentication object
	        String username = getUsername(token);
	        // Create an Authentication object (e.g., UsernamePasswordAuthenticationToken)
	        // Example:
	        return new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());
	    }
	}
