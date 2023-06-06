// com.example.FirstWeb.service.SearchInputService.java
package com.example.FirstWeb.service;

import com.example.FirstWeb.model.SearchInput;
import com.example.FirstWeb.repository.SearchInputRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.Date;

@Service
public class SearchInputService {

    @Autowired
    private SearchInputRepository searchInputRepository;

    public SearchInput saveSearchInput(String input) {
        SearchInput searchInput = new SearchInput();
        searchInput.setSearchInput(input);
        searchInput.setDate(LocalDate.now()); // 현재 날짜 저장
        return searchInputRepository.save(searchInput);
    }
}
