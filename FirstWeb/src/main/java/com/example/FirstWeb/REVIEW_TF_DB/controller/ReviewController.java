package com.example.FirstWeb.REVIEW_TF_DB.controller;

import com.example.FirstWeb.REVIEW_TF_DB.dto.ReviewDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ReviewController {

    private static final String DB_URL = "jdbc:tibero:thin:@112.168.80.6:8629:tibero";
    private static final String DB_USER = "YOUNGHO";
    private static final String DB_PASSWORD = "nare";

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/review")
    public List<ReviewDTO> getReviewsByRestId(@RequestParam("rest_id") String restId) {
        List<ReviewDTO> reviews = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM REVIEW_TF WHERE REST_ID = ?")) {

            stmt.setString(1, restId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    ReviewDTO review = new ReviewDTO();
                    review.setReview(rs.getString("REVIEW"));
                    review.setReImUrl(rs.getString("RE_IM_URL"));
                    review.setProfile(rs.getString("PROFILE"));
                    review.setMyPlace(rs.getString("MY_PLACE"));
                    review.setWriter(rs.getString("WRITER"));
                    review.setWriterCount(rs.getInt("WRITER_COUNT"));
                    review.setWriteDay(rs.getString("WRITE_DAY"));
                    review.setVisitCount(rs.getInt("VISIT_COUNT"));
                    review.setLabel(rs.getString("LABEL"));
                    // 추가 필드들 설정...

                    reviews.add(review);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return reviews;
    }
}
