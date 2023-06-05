package com.example.FirstWeb.Repository;

import com.example.FirstWeb.model.SearchInputCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface SearchInputCountDateRepository extends JpaRepository<SearchInputCount, Long> {
    List<SearchInputCount> findByDateBetweenOrderByCountDesc(Date startDate, Date endDate);
}
