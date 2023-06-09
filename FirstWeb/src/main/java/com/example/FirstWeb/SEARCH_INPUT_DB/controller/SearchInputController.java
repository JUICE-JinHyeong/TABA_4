// com.example.FirstWeb.controller.SearchInputController.java
package com.example.FirstWeb.SEARCH_INPUT_DB.controller;

import com.example.FirstWeb.SEARCH_INPUT_DB.dto.SearchInputDto;
import com.example.FirstWeb.SEARCH_INPUT_DB.entity.SearchInput;
import com.example.FirstWeb.SEARCH_INPUT_DB.service.SearchInputService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") // CORS 설정
@RestController
@RequestMapping("/api/input")
public class SearchInputController {

    @Autowired
    private SearchInputService searchInputService;

    @CrossOrigin(origins = "*") // CORS 설정
    @PostMapping
    public SearchInput saveSearchInput(@RequestBody SearchInputDto searchInputDto) {
        return searchInputService.saveSearchInput(searchInputDto.getSearchInput());
    }
}
