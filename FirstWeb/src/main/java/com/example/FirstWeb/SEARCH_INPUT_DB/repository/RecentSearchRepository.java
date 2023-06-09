// com.example.FirstWeb.repository.RecentSearchRepository.java
package com.example.FirstWeb.SEARCH_INPUT_DB.repository;

import com.example.FirstWeb.SEARCH_INPUT_DB.entity.SearchInput;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RecentSearchRepository extends JpaRepository<SearchInput, Long> {

    @Query("SELECT si.searchInput, COUNT(si) FROM SearchInput si " +
            "WHERE si.date >= :startDate AND si.date <= :endDate " +
            "GROUP BY si.searchInput " +
            "ORDER BY COUNT(si) DESC")
    List<Object[]> findTopSearchesInLastWeek(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
