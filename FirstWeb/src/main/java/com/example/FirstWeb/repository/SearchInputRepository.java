// com.example.FirstWeb.repository.SearchInputRepository.java
package com.example.FirstWeb.repository;

import com.example.FirstWeb.model.SearchInput;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.time.LocalDate;


public interface SearchInputRepository extends JpaRepository<SearchInput, Long> {}


