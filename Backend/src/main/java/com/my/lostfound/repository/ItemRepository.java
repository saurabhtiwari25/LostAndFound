package com.my.lostfound.repository;

import com.my.lostfound.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {

    Page<Item> findByDeletedFalse(Pageable pageable);

    Optional<Item> findByIdAndDeletedFalse(Long id);

    List<Item> findByTitleContainingIgnoreCaseAndDeletedFalse(String keyword);

    List<Item> findByLocationAndFoundAndDeletedFalse(String location, boolean found);

}