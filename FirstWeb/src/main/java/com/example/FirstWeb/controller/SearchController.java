package com.example.FirstWeb.controller;

import com.example.FirstWeb.dto.SearchInputDTO;
import com.example.FirstWeb.model.SearchInputCount;
import com.example.FirstWeb.Service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/input")
@CrossOrigin(origins = "*")
public class SearchController {

    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @PostMapping
    public void handleSearchInput(@RequestBody SearchInputDTO searchInputDTO) {
        String searchInput = searchInputDTO.getSearchInput();
        searchService.saveSearch(searchInput);
    }

    @GetMapping("/recent")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<SearchInputCount> getRecentSearches() {
        return searchService.getTop5RecentSearches();
    }
}

