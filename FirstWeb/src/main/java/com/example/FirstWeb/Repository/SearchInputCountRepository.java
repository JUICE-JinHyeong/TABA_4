package com.example.FirstWeb.Repository;

import com.example.FirstWeb.model.SearchInputCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchInputCountRepository extends JpaRepository<SearchInputCount, Long> {
    SearchInputCount findBySearchInput(String searchInput);
}
