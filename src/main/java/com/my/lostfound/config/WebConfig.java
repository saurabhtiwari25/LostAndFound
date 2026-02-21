package com.my.lostfound.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.util.unit.DataSize;

import jakarta.servlet.MultipartConfigElement; // ✅ Correct namespace for Spring Boot 3
import java.io.File;

/**
 * File upload configuration
 */
@Configuration
public class WebConfig {

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();

        // Setting the temporary location for file uploads
        factory.setLocation(System.getProperty("java.io.tmpdir") + File.separator + "uploads");

        // Optional but recommended: Set max file sizes to avoid server crashes
        factory.setMaxFileSize(DataSize.ofMegabytes(10));
        factory.setMaxRequestSize(DataSize.ofMegabytes(10));

        return factory.createMultipartConfig();
    }
}