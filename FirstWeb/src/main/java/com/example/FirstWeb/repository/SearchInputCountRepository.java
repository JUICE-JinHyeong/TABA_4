package com.example.FirstWeb.repository;

import com.example.FirstWeb.model.SearchInputCount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchInputCountRepository extends JpaRepository<SearchInputCount, Long> {
    SearchInputCount findBySearchInput(String searchInput);
}
