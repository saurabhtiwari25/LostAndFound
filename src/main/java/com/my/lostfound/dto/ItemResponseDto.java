package com.my.lostfound.dto;


import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemResponseDto {

    private Long id;

    private String title;

    private String description;

    private String location;

    private boolean found;

    private String imagePath;

    private LocalDateTime createdAt;

}