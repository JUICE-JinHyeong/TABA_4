// com.example.FirstWeb.service.RecentSearchService.java
package com.example.FirstWeb.service;

import com.example.FirstWeb.dto.RecentSearchDto;
import com.example.FirstWeb.repository.RecentSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecentSearchService {
    private final RecentSearchRepository recentSearchRepository;

    public RecentSearchService(RecentSearchRepository recentSearchRepository) {
        this.recentSearchRepository = recentSearchRepository;
    }

    public List<RecentSearchDto> getRecentSearches() {
        LocalDate endDate = LocalDate.now();  // 현재 날짜
        LocalDate startDate = endDate.minusWeeks(1);  // 일주일 전 날짜

        List<Object[]> searchResults = recentSearchRepository.findTopSearchesInLastWeek(startDate, endDate);

        List<RecentSearchDto> recentSearchDtos = new ArrayList<>();
        for (Object[] result : searchResults) {
            String searchInput = (String) result[0];
            Long searchCount = (Long) result[1];
            RecentSearchDto recentSearchDto = new RecentSearchDto(searchInput, searchCount);
            recentSearchDtos.add(recentSearchDto);
        }

        return recentSearchDtos;
    }
}
