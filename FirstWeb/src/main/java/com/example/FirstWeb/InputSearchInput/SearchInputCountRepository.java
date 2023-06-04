package com.example.FirstWeb.InputSearchInput;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchInputCountRepository extends JpaRepository<SearchInputCount, Long> {
    SearchInputCount findBySearchInput(String searchInput);
}
