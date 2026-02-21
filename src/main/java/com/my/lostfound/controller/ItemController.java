package com.my.lostfound.controller;

import com.my.lostfound.dto.ItemRequestDto;
import com.my.lostfound.dto.ItemResponseDto;
import com.my.lostfound.service.ItemService;
import com.my.lostfound.payload.ApiResponse;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private static final Logger log =
            LoggerFactory.getLogger(ItemController.class);

    @Autowired
    private ItemService itemService;

    // ✅ Create Item (With Validation)
    @PostMapping
    public ResponseEntity<ApiResponse<ItemResponseDto>> createItem(
            @Valid @RequestBody ItemRequestDto dto) {

        log.info("Creating new item");

        ItemResponseDto response = itemService.createItem(dto);

        return ResponseEntity.ok(
                ApiResponse.success("Item created successfully", response)
        );
    }


    // ✅ Get All Items (Pagination + Sorting)
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ItemResponseDto>>> getAllItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {

        log.info("Fetching all items");

        Page<ItemResponseDto> items =
                itemService.getAllItems(page, size, sortBy, direction);

        return ResponseEntity.ok(
                ApiResponse.success("Items fetched", items)
        );
    }


    // ✅ Get Item By ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ItemResponseDto>> getItemById(
            @PathVariable Long id) {

        log.info("Fetching item with id: {}", id);

        ItemResponseDto item = itemService.getItemById(id);

        return ResponseEntity.ok(
                ApiResponse.success("Item found", item)
        );
    }


    // ✅ Update Item
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ItemResponseDto>> updateItem(
            @PathVariable Long id,
            @Valid @RequestBody ItemRequestDto dto) {

        log.info("Updating item id: {}", id);

        ItemResponseDto updated =
                itemService.updateItem(id, dto);

        return ResponseEntity.ok(
                ApiResponse.success("Item updated", updated)
        );
    }


    // ✅ Soft Delete Item
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteItem(
            @PathVariable Long id) {

        log.info("Deleting item id: {}", id);

        itemService.deleteItem(id);

        return ResponseEntity.ok(
                ApiResponse.success("Item deleted", "Success")
        );
    }


    // ✅ Search By Title
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Object>> searchByTitle(
            @RequestParam String keyword) {

        log.info("Searching items: {}", keyword);

        Object result =
                itemService.searchByTitle(keyword);

        return ResponseEntity.ok(
                ApiResponse.success("Search result", result)
        );
    }


    // ✅ Filter By Location + Status
    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<Object>> filterItems(
            @RequestParam String location,
            @RequestParam boolean found) {

        log.info("Filtering items");

        Object result =
                itemService.filterItems(location, found);

        return ResponseEntity.ok(
                ApiResponse.success("Filtered items", result)
        );
    }


    // ✅ Upload Image
    @PostMapping("/{id}/upload")
    public ResponseEntity<ApiResponse<String>> uploadImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        log.info("Uploading image for item {}", id);

        String path =
                itemService.uploadImage(id, file);

        return ResponseEntity.ok(
                ApiResponse.success("File uploaded", path)
        );
    }

}