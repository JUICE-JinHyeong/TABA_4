package com.example.FirstWeb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class WordCloudReviewController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @CrossOrigin
    @GetMapping("/wordcloudreview")
    public ResponseEntity<List<Map<String, Object>>> getReviewsByRestId(
            @RequestParam("rest_id") String restId,
            @RequestParam("word") String word) {

        String sql = "SELECT * FROM REVIEW_TF WHERE REST_ID = ? AND REVIEW LIKE ?";

        // Preparing the parameters for the SQL query
        Object[] params = {restId, "%" + word + "%"};

        List<Map<String, Object>> reviews = jdbcTemplate.queryForList(sql, params);

        if (reviews.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }
}
