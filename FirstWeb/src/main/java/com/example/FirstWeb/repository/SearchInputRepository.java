// com.example.FirstWeb.repository.SearchInputRepository.java

package com.example.FirstWeb.repository;

import com.example.FirstWeb.model.SearchInput;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SearchInputRepository extends JpaRepository<SearchInput, Long> {
}
