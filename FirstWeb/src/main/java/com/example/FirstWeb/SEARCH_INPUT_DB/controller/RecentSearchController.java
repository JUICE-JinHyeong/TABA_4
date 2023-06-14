// com.example.FirstWeb.controller.RecentSearchController.java
package com.example.FirstWeb.SEARCH_INPUT_DB.controller;

import com.example.FirstWeb.SEARCH_INPUT_DB.dto.RecentSearchDto;
import com.example.FirstWeb.SEARCH_INPUT_DB.service.RecentSearchService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@CrossOrigin(origins = "*") // CORS 설정
@RestController
@RequestMapping("/api/recent")
public class RecentSearchController {
    private final RecentSearchService recentSearchService;

    public RecentSearchController(RecentSearchService recentSearchService) {
        this.recentSearchService = recentSearchService;
    }

    @GetMapping
    public List<RecentSearchDto> getRecentSearches() {
        return recentSearchService.getRecentSearches();
    }
}

