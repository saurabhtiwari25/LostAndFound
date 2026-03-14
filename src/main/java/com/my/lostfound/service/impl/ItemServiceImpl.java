package com.my.lostfound.service.impl;

import com.my.lostfound.dto.ItemRequestDto;
import com.my.lostfound.dto.ItemResponseDto;
import com.my.lostfound.entity.Item;
import com.my.lostfound.exception.ResourceNotFoundException;
import com.my.lostfound.repository.ItemRepository;
import com.my.lostfound.service.ItemService;
import com.my.lostfound.util.FileUploadUtil;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private static final Logger log =
            LoggerFactory.getLogger(ItemServiceImpl.class);

    private final ItemRepository itemRepository;
    private final FileUploadUtil fileUploadUtil;

    // Create Item
    @Override
    public ItemResponseDto createItem(ItemRequestDto dto) {

        log.info("Creating item: {}", dto.getTitle());

        Item item = Item.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .location(dto.getLocation())
                .found(false)
                .deleted(false)
                .build();

        Item saved = itemRepository.save(item);

        return mapToDTO(saved);
    }

    // Get All (Pagination)
    @Override
    public Page<ItemResponseDto> getAllItems(int page, int size) {

        log.info("Fetching items page {}", page);

        Pageable pageable = PageRequest.of(page, size);

        Page<Item> items =
                itemRepository.findByDeletedFalse(pageable);

        return items.map(this::mapToDTO);
    }

    // Get By ID
    @Override
    public ItemResponseDto getItemById(Long id) {

        log.info("Getting item id {}", id);

        Item item = itemRepository
                .findByIdAndDeletedFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Item not found"));

        return mapToDTO(item);
    }

    // Update
    @Override
    public ItemResponseDto updateItem(Long id, ItemRequestDto dto) {

        log.info("Updating item id {}", id);

        Item item = itemRepository
                .findByIdAndDeletedFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Item not found"));

        item.setTitle(dto.getTitle());
        item.setDescription(dto.getDescription());
        item.setLocation(dto.getLocation());

        Item updated = itemRepository.save(item);

        return mapToDTO(updated);
    }

    // Soft Delete
    @Override
    public void deleteItem(Long id) {

        log.info("Soft deleting item id {}", id);

        Item item = itemRepository
                .findByIdAndDeletedFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Item not found"));

        item.setDeleted(true);

        itemRepository.save(item);
    }

    // Search
    @Override
    public List<ItemResponseDto> searchByTitle(String keyword) {

        log.info("Searching items: {}", keyword);

        return itemRepository
                .findByTitleContainingIgnoreCaseAndDeletedFalse(keyword)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Filter
    @Override
    public List<ItemResponseDto> filterItems(String location, boolean found) {

        log.info("Filtering items by location '{}' and found={}",
                location, found);

        return itemRepository
                .findByLocationAndFoundAndDeletedFalse(location, found)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Upload Image
    @Override
    public String uploadImage(Long id, MultipartFile file) {

        log.info("Uploading file for item {}", id);

        if (file.getContentType() == null ||
                !file.getContentType().startsWith("image/")) {

            throw new RuntimeException("Only image files are allowed");
        }

        Item item = itemRepository
                .findByIdAndDeletedFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Item not found"));

        String path = fileUploadUtil.saveFile(file);

        item.setImagePath(path);

        itemRepository.save(item);

        return path;
    }

    // Entity → DTO Mapper
    private ItemResponseDto mapToDTO(Item item) {

        return ItemResponseDto.builder()
                .id(item.getId())
                .title(item.getTitle())
                .description(item.getDescription())
                .location(item.getLocation())
                .found(item.isFound())
                .imagePath(item.getImagePath())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }
}