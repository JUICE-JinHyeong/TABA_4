// com.example.FirstWeb.controller.RecentSearchController.java
package com.example.FirstWeb.controller;

import com.example.FirstWeb.dto.RecentSearchDto;
import com.example.FirstWeb.service.RecentSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

