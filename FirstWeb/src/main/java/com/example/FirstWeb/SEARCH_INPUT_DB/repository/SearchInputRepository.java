// com.example.FirstWeb.repository.SearchInputRepository.java

package com.example.FirstWeb.SEARCH_INPUT_DB.repository;

import com.example.FirstWeb.SEARCH_INPUT_DB.model.SearchInput;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SearchInputRepository extends JpaRepository<SearchInput, Long> {
}
