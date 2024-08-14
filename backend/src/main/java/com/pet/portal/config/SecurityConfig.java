package com.pet.portal.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.pet.portal.security.JwtAuthenticationFilter;
import com.pet.portal.security.JwtTokenProvider;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	 http
         .csrf().disable()
         .authorizeRequests()
             .antMatchers("/users/register", "/users/login").permitAll()
             .antMatchers("/pets/**").permitAll()
             .antMatchers("/uploads/**").permitAll()
             .antMatchers("/users/currentUser").authenticated()
             .anyRequest().authenticated()
             .and()
         .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
         .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
         .and()
         .cors().configurationSource(request -> {
             CorsConfiguration corsConfig = new CorsConfiguration();
             corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
             corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
             corsConfig.setAllowedHeaders(Arrays.asList("*"));
             corsConfig.setAllowCredentials(true);
             return corsConfig;
         });
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
 }