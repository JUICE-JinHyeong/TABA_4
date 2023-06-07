package com.example.FirstWeb.SearchFromDB;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
@CrossOrigin(origins = "*")

@RestController
public class RecentSearchController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @CrossOrigin
    @GetMapping("/api/recent")
    public List<Object[]> getRecentSearchInputs() {
        String sql = "SELECT SEARCHINPUT, COUNT(SEARCHINPUT) AS COUNT " +
                "FROM SEARCH_INPUT " +
                "WHERE DATE_ >= (CURRENT_DATE - INTERVAL '7' DAY) " +
                "GROUP BY SEARCHINPUT " +
                "ORDER BY COUNT DESC " ;


        List<Object[]> results = jdbcTemplate.query(sql, new RowMapper<Object[]>() {
            @Override
            public Object[] mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Object[]{rs.getString("SEARCHINPUT"), rs.getInt("COUNT")};
            }
        });

        return results.subList(0, Math.min(results.size(), 5));
    }
}
