package com.my.lostfound.service;



import com.my.lostfound.dto.ItemRequestDto;
import com.my.lostfound.dto.ItemResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    // Create
    ItemResponseDto createItem(ItemRequestDto dto);

    // Get All (Pagination + Sorting)
    Page<ItemResponseDto> getAllItems(
            int page,
            int size,
            String sortBy,
            String direction
    );

    // Get By ID
    ItemResponseDto getItemById(Long id);

    // Update
    ItemResponseDto updateItem(Long id, ItemRequestDto dto);

    // Soft Delete
    void deleteItem(Long id);

    // Search
    List<ItemResponseDto> searchByTitle(String keyword);

    // Filter
    List<ItemResponseDto> filterItems(String location, boolean found);

    // File Upload
    String uploadImage(Long id, MultipartFile file);

}