package com.my.lostfound.util;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * Utility class for saving uploaded files
 */
@Component
public class FileUploadUtil {

    // Directory where files will be saved
    private final String uploadDir = System.getProperty("user.dir") + "/uploads";

    /**
     * Save a file and return its relative path
     *
     * @param file MultipartFile from request
     * @return relative path of saved file
     */
    public String saveFile(MultipartFile file) {

        // Create directory if it does not exist
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

        // Path to save
        Path filePath = Paths.get(uploadDir, uniqueFilename);

        try {
            // Save file to disk
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file " + uniqueFilename, e);
        }

        // Return relative path for DB storage
        return "/uploads/" + uniqueFilename;
    }

}