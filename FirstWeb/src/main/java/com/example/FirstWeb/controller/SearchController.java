package com.example.FirstWeb.controller;

import com.example.FirstWeb.dto.SearchInputDTO;
import com.example.FirstWeb.dto.SearchInputDTO;
import com.example.FirstWeb.Service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/input")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {

    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @PostMapping
    public void handleSearchInput(@RequestBody SearchInputDTO searchInputDTO) {
        String searchInput = searchInputDTO.getSearchInput();
        // Do any necessary validations or processing of the search input
        searchService.saveSearch(searchInput);
    }
}
