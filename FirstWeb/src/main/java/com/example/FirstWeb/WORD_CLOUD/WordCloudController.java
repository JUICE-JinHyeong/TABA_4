package com.example.FirstWeb.WORD_CLOUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class WordCloudController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @CrossOrigin
    @GetMapping("/api/wordcloud")
    public ResponseEntity<List<Map<String, Object>>> getReviewsByRestId(@RequestParam("rest_id") String restId) {
        String sql = "SELECT * FROM WORD_CLOUD WHERE REST_ID = ?";
        List<Map<String, Object>> reviews = null;
        try {
            reviews = jdbcTemplate.queryForList(sql, restId);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            // 로그를 남기거나, 적절한 오류 메시지를 반환합니다.
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
