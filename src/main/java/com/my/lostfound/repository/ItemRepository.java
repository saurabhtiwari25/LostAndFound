package com.my.lostfound.repository;

import com.my.lostfound.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {

    // Pagination of non-deleted items
    Page<Item> findByDeletedFalse(Pageable pageable);

    // Get single item by ID if not deleted
    Optional<Item> findByIdAndDeletedFalse(Long id);

    // Get all non-deleted items (no pagination)
    List<Item> findByDeletedFalse();

    // Search non-deleted items by title (case-insensitive)
    List<Item> findByTitleContainingIgnoreCaseAndDeletedFalse(String keyword);

    // Filter non-deleted items by location and found status
    List<Item> findByLocationAndFoundAndDeletedFalse(String location, boolean found);

}