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

    //  Use the same upload directory
    private final String uploadDir = Paths.get(System.getProperty("user.dir"), "uploads").toString();

    public String saveFile(MultipartFile file) {

        // Create folder if it doesn't exist
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String uniqueFilename = UUID.randomUUID().toString() + extension;

        Path filePath = Paths.get(uploadDir, uniqueFilename);

        try {
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file " + uniqueFilename, e);
        }

        // Return relative path for DB (optional)
        return "/uploads/" + uniqueFilename;
    }
}