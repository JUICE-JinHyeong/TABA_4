package com.example.FirstWeb.InputSearchInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.sql.Timestamp;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/input")
public class SearchController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping
    public void saveSearch(@RequestBody String searchInput) {
        String query = "SELECT * FROM SearchInputCount WHERE SEARCHINPUT = ?";
        List<SearchInputCount> existingSearches = jdbcTemplate.query(query, new Object[]{searchInput}, new RowMapper<SearchInputCount>() {
            @Override
            public SearchInputCount mapRow(ResultSet rs, int rowNum) throws SQLException {
                SearchInputCount search = new SearchInputCount();
                search.setId(rs.getLong("id"));
                search.setSearchInput(rs.getString("SEARCHINPUT"));
                search.setCount(rs.getInt("COUNT"));
                search.setDate(rs.getDate("DATE"));
                return search;
            }
        });

        if (!existingSearches.isEmpty()) {
            // If the search input exists, increase the count
            SearchInputCount existingSearch = existingSearches.get(0);
            query = "UPDATE SearchInputCount SET COUNT = ?, DATE = ? WHERE SEARCHINPUT = ?";
            jdbcTemplate.update(query, existingSearch.getCount() + 1, new Timestamp(new Date().getTime()), searchInput);
        } else {
            // If the search input does not exist, create a new record
            query = "INSERT INTO SearchInputCount (SEARCHINPUT, COUNT, DATE) VALUES (?, ?, ?)";
            jdbcTemplate.update(query, searchInput, 1, new Timestamp(new Date().getTime()));
        }
    }
}

//import org.springframework.web.bind.annotation.*;
//import org.springframework.http.ResponseEntity;
//import org.springframework.http.HttpStatus;
//import java.util.*;
//import org.springframework.beans.factory.annotation.Autowired;
//
//@RestController
//@RequestMapping("/search")
//public class SearchController {
//    private final SearchRepository searchRepository;
//
//    public SearchController(SearchRepository searchRepository) {
//        this.searchRepository = searchRepository;
//    }
//
//    @PostMapping
//    public ResponseEntity<Search> createSearch(@RequestBody Search search) {
//        // Check if the search query already exists in the database
//        Optional<Search> existingSearch = searchRepository.findBySearchInput(search.getSearchInput());
//        if (existingSearch.isPresent()) {
//            // If it exists, increase the count and update the date
//            Search searchToUpdate = existingSearch.get();
//            searchToUpdate.setCount(searchToUpdate.getCount() + 1);
//            searchToUpdate.setDate(search.getDate());
//            searchRepository.save(searchToUpdate);
//            return new ResponseEntity<>(searchToUpdate, HttpStatus.OK);
//        } else {
//            // If it does not exist, save it as a new search query with count = 1
//            search.setCount(1);
//            Search savedSearch = searchRepository.save(search);
//            return new ResponseEntity<>(savedSearch, HttpStatus.CREATED);
//        }
//    }
//}
