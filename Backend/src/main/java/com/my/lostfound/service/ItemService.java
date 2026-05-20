package com.my.lostfound.service;

import com.my.lostfound.dto.ItemRequestDto;
import com.my.lostfound.dto.ItemResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponseDto createItem(ItemRequestDto dto);

    Page<ItemResponseDto> getAllItems(int page, int size);

    ItemResponseDto getItemById(Long id);

    ItemResponseDto updateItem(Long id, ItemRequestDto dto);

    void deleteItem(Long id);

    List<ItemResponseDto> searchByTitle(String keyword);

    List<ItemResponseDto> filterItems(String location, boolean found);

    String uploadImage(Long id, MultipartFile file);

}