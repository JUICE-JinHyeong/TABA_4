// com.example.FirstWeb.service.RecentSearchService.java
package com.example.FirstWeb.SEARCH_INPUT_DB.service;

import com.example.FirstWeb.SEARCH_INPUT_DB.dto.RecentSearchDto;
import com.example.FirstWeb.SEARCH_INPUT_DB.repository.RecentSearchRepository;
import org.springframework.data.domain.PageRequest;
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

        // 상위 10개 결과만 추출
        List<Object[]> topSearchResults = searchResults.stream()
                .sorted((a, b) -> ((Long) b[1]).compareTo((Long) a[1])) // 검색 횟수를 기준으로 내림차순 정렬
                .limit(10) // 상위 10개만 추출
                .collect(Collectors.toList());

        List<RecentSearchDto> recentSearchDtos = new ArrayList<>();
        for (Object[] result : topSearchResults) {
            String searchInput = (String) result[0];
            Long searchCount = (Long) result[1];
            RecentSearchDto recentSearchDto = new RecentSearchDto(searchInput, searchCount);
            recentSearchDtos.add(recentSearchDto);
        }

        return recentSearchDtos;
    }


}
