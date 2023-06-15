package com.example.FirstWeb.SEARCH_INPUT_DB.service;

import com.example.FirstWeb.SEARCH_INPUT_DB.dto.SearchInputDto;
import com.example.FirstWeb.SEARCH_INPUT_DB.entity.SearchInput;
import com.example.FirstWeb.SEARCH_INPUT_DB.repository.SearchInputRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class SearchInputService {

    @Autowired
    private SearchInputRepository searchInputRepository;

    public SearchInput saveSearchInput(SearchInputDto searchInputDto) {
        SearchInput searchInput = new SearchInput();
        searchInput.setSearchInput(searchInputDto.getSearchInput());
        searchInput.setSelectedOption(searchInputDto.getSelectedOption());
        searchInput.setDate(LocalDate.now()); // 현재 날짜 저장
        return searchInputRepository.save(searchInput);
    }
}
