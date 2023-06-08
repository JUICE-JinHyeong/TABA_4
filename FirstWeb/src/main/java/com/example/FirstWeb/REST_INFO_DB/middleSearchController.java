package com.example.FirstWeb.REST_INFO_DB;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@RestController //CORS정책
public class middleSearchController {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @CrossOrigin
    @GetMapping("/search") // 
    public List<Map<String, Object>> search(
            @RequestParam("searchOption") String searchOption,
            @RequestParam("searchInput") String searchInput
    ) {
        String tableName;
        List<String> columnNames;

        // 검색 옵션에 따라 테이블명과 검색 대상 컬럼 설정
        if (searchOption.equals("음식")) {
            tableName = "REST_INFO";
            columnNames = new ArrayList<>();
            columnNames.add("MENU");
            columnNames.add("BIG_TYPE");
            columnNames.add("KIND");
        } else if (searchOption.equals("식당")) {
            tableName = "REST_INFO";
            columnNames = new ArrayList<>();
            columnNames.add("REST_NAME");
        } else if (searchOption.equals("지역")) {
            tableName = "REST_INFO";
            columnNames = new ArrayList<>();
            columnNames.add("BOSS_ADDRESS");
            columnNames.add("ROAD");
            columnNames.add("STATUS");
            columnNames.add("ROAD_STATUS");
            columnNames.add("POST_STATUS");
            columnNames.add("SD");
            columnNames.add("SD_SGG");
            columnNames.add("SGG");
            columnNames.add("SD_SGG_EMD");
            columnNames.add("EMD");
        } else {
            // 옵션에 따른 처리 추가
            // 다른 검색 옵션을 추가할 경우에 대한 로직 작성
            return new ArrayList<>(); // 예외 처리 등을 위해 빈 리스트 반환
        }

        // 쿼리 작성
        StringBuilder sql = new StringBuilder("SELECT * FROM " + tableName + " WHERE ");
        List<Object> params = new ArrayList<>();

        for (int i = 0; i < columnNames.size(); i++) {
            String columnName = columnNames.get(i);
            sql.append(columnName).append(" LIKE ?");
            params.add("%" + searchInput + "%");

            if (i < columnNames.size() - 1) {
                sql.append(" OR ");
            }
        }

        // DB에서 데이터 조회
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql.toString(), params.toArray());

        //유사도 혹은 긍정리뷰수에 따른 상위50개 행 추출

        // 검색 결과를 터미널에 출력
//        for (Map<String, Object> row : result) {
//            System.out.println(row+"\n");
//        }

        return result;
    }

}
