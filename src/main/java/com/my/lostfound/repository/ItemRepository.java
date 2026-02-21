package com.my.lostfound.repository;



import com.my.lostfound.entity.Item;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {

    // ✅ Get all non-deleted items (Pagination + Sorting)
    Page<Item> findByDeletedFalse(Pageable pageable);


    // ✅ Get single item (not deleted)
    Optional<Item> findByIdAndDeletedFalse(Long id);


    // ✅ Search by title (LIKE %keyword%)
    List<Item> findByTitleContainingIgnoreCaseAndDeletedFalse(String keyword);


    // ✅ Filter by location + found status
    List<Item> findByLocationAndFoundAndDeletedFalse(
            String location,
            boolean found
    );


    // ✅ Get all non-deleted (no pagination - optional)
    List<Item> findByDeletedFalse();

}