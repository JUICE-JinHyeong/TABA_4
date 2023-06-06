// com.example.FirstWeb.controller.SearchInputController.java
package com.example.FirstWeb.controller;

import com.example.FirstWeb.dto.SearchInputDto;
import com.example.FirstWeb.model.SearchInput;
import com.example.FirstWeb.service.SearchInputService;
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
