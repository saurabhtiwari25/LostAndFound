package com.my.lostfound.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "items")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, length = 100)
    private String title;


    @Column(nullable = false, length = 500)
    private String description;


    @Column(nullable = false)
    private String location;


    // Lost / Found status
    private boolean found = false;


    // For file upload (image path)
    private String imagePath;


    // Soft delete flag
    private boolean deleted = false;


    // Created time
    private LocalDateTime createdAt;


    // Updated time
    private LocalDateTime updatedAt;


    // Auto set when record is created
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }


    // Auto set when record is updated
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}