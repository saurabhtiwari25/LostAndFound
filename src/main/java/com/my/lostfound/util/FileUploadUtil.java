package com.my.lostfound.util;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class FileUploadUtil {

    private final String uploadDir =
            Paths.get(System.getProperty("user.dir"), "uploads").toString();

    public String saveFile(MultipartFile file) {

        if (file.isEmpty()) {
            throw new RuntimeException("Cannot upload empty file");
        }

        String contentType = file.getContentType();

        if (contentType == null || !contentType.startsWith("image/")) {
            throw new RuntimeException("Only image files are allowed");
        }

        // Create folder if not exists
        File dir = new File(uploadDir);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Get extension
        String originalFilename = file.getOriginalFilename();
        String extension = "";

        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(
                    originalFilename.lastIndexOf("."));
        }

        // Generate unique name
        String uniqueFilename = UUID.randomUUID() + extension;

        Path filePath = Paths.get(uploadDir, uniqueFilename);

        try {
            Files.copy(file.getInputStream(), filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file " + uniqueFilename, e);
        }

        return "/uploads/" + uniqueFilename;
    }
}