package com.pet.portal.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

	 @Value("${file.storage.location}")
	    private String fileStorageLocation;

	    public String storeFile(MultipartFile file) throws IOException {
	        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	        Path targetLocation = Paths.get(fileStorageLocation).resolve(fileName);
	        Files.copy(file.getInputStream(), targetLocation);
	        return fileName;
	    }

	    public byte[] getFile(String fileName) throws IOException {
	        Path filePath = Paths.get(fileStorageLocation).resolve(fileName).normalize();
	        return Files.readAllBytes(filePath);
	    }
}
