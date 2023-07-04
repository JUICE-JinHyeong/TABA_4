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

    @CrossOrigin(origins = "*") // CORS 설정

    @GetMapping("/api/search") //
    public List<Map<String, Object>> search(
            @RequestParam("selectedOption") String selectedOption,
            @RequestParam("searchInput") String searchInput
    ) {
        String tableName;
        List<String> columnNames;

        // 검색 옵션에 따라 테이블명과 검색 대상 컬럼 설정
        if (selectedOption.equals("음식")) {
            tableName = "REST_INFO";
            columnNames = new ArrayList<>();
            columnNames.add("BIG_TYPE");
            columnNames.add("MENU"); //
            columnNames.add("KIND");
        } else if (selectedOption.equals("식당")) {
            tableName = "REST_INFO";
            columnNames = new ArrayList<>();
            columnNames.add("REST_NAME");
        } else if (selectedOption.equals("지역")) {
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

//        StringBuilder sql = new StringBuilder("SELECT RI.IMAGE, RI.REST_NAME, RI.EXPLAIN, RI.BOSS_ADDRESS, RI.OPEN_HOUR, RI.NUM, RI.REST_ID, COUNT(RT.REST_ID) AS REVIEW_COUNT FROM " + tableName + " AS RI LEFT JOIN REVIEW_TF AS RT ON RI.REST_ID = RT.REST_ID WHERE ");
//        List<Object> params = new ArrayList<>();
//
//
//        for (int i = 0; i < columnNames.size(); i++) {
//            String columnName = columnNames.get(i);
//            sql.append(columnName).append(" LIKE ?");
//            params.add("%" + searchInput + "%");
//
//            if (i < columnNames.size() - 1) {
//                sql.append(" OR ");
//            }
//        }
//        sql.append("GROUP BY RI.IMAGE, RI.REST_NAME, RI.EXPLAIN, RI.BOSS_ADDRESS, RI.OPEN_HOUR, RI.NUM, RI.REST_ID ORDER BY COUNT(RT.REST_ID) DESC");
//
//        // DB에서 데이터 조회
//        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql.toString(), params.toArray());
//
//        return result;
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

        return result;
    }

    }

    /*
    User
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

        return result;

ChatGPT
여기서 변경하고 싶으신 내용을 좀 더 구체적으로 말씀해주실 수 있으신가요? 위의 코드는 SQL 쿼리를 생성하여, 사용자가 입력한 검색어에 대해 특정 테이블에서 LIKE 연산자를 사용하여 데이터를 조회하는 기능을 수행합니다.

어떤 변경을 원하시는지, 어떤 결과를 원하시는지에 대한 자세한 정보를 주시면 더 좋은 도움을 드릴 수 있을 것 같습니다.





User
나는 REST_INFO 테이블에서 IMAGE,REST_NAME,EXPLAIN,BOSS_ADDRESS,NUM,OPEN_HOUR,REST_ID 열을 반환 받고 싶어
The previous model used in this conversation is unavailable. We've switched you to the latest default model.
ChatGPT

2 / 2

이해했습니다. REST_INFO 테이블에서 원하는 열을 반환받기 위해 코드를 수정해보겠습니다.

java
Copy code
StringBuilder sql = new StringBuilder("SELECT IMAGE, REST_NAME, EXPLAIN, BOSS_ADDRESS, NUM, OPEN_HOUR, REST_ID FROM " + tableName + " WHERE ");
List<Object> params = new ArrayList<>();

for (int i = 0; i < columnNames.size(); i++) {
    String columnName = columnNames.get(i);
    sql.append(columnName).append(" LIKE ?");
    params.add("%" + searchInput + "%");





User
여기서 열이 반환되는 순서를 내가 정하고싶어
ChatGPT
원하는 열의 반환 순서를 지정하고자 한다면, SQL 쿼리에서 SELECT 문장에 열을 명시하는 순서를 조정하면 됩니다.

java
Copy code
StringBuilder sql = new StringBuilder("SELECT IMAGE, REST_NAME, EXPLAIN, BOSS_ADDRESS, NUM, OPEN_HOUR, REST_ID FROM " + tableName + " WHERE ");
위의 코드에서 SELECT 문장의 열 목록 순서를 원하는 순서로 변경해주면 됩니다. 예를 들어, REST_NAME을 첫 번째로, REST_ID를 마지막으로 반환하고 싶다면 다음과 같이 변경할 수 있습니다:

java
Copy code
StringBuilder sql = new StringBuilder("SELECT REST_NAME, IMAGE, EXPLAIN, BOSS_ADDRESS, NUM, OPEN_HOUR, REST_ID FROM " + tableName + " WHERE ");




User
여기서 행이 반환되는 순서를 정하고싶어
ChatGPT
원하는 행의 반환 순서를 지정하고자 한다면, SQL 쿼리에서 ORDER BY 구문을 사용하여 정렬 순서를 지정할 수 있습니다.

java
Copy code
StringBuilder sql = new StringBuilder("SELECT IMAGE, REST_NAME, EXPLAIN, BOSS_ADDRESS, NUM, OPEN_HOUR, REST_ID FROM " + tableName + " WHERE ");
위의 코드에서, ORDER BY 구문을 추가하여 원하는 순서로 정렬할 수 있습니다. 예를 들어, REST_ID를 기준으로 오름차순으로 정렬하고 싶다면 다음과 같이 변경할 수 있습니다:

java
Copy code
StringBuilder sql = new StringBuilder("SELECT IMAGE, REST_NAME, EXPLAIN, BOSS_ADDRESS, NUM, OPEN_HOUR, REST_ID FROM " + tableName + " WHERE ORDER BY REST_ID ASC");
여기서 ASC는 오름차순을 나타내는 키워드입니다. 원하는 열과 정렬 방식에 따라 ORDER BY 구문을 수정하여 원하는 행의 반환 순서를 지정할 수 있습니다.





User
행을 반환하는 순서를 조절하는 것을 필터링이라고 부를게
ChatGPT
행을 반환하는 순서를 조절하여 원하는 결과를 필터링하고 싶다는 말씀이신가요? 그렇다면, 결과를 필터링하고 원하는 순서로 정렬하는 방법을 제안드리겠습니다.

먼저, WHERE 절을 사용하여 필요한 필터링을 수행한 후, ORDER BY 절을 사용하여 행의 반환 순서를 조절할 수 있습니다. 예를 들어, REST_INFO 테이블에서 BOSS_ADDRESS 열을





User
REVIEW_TF에도 REST_ID라는 열이 있는데 REST_INFO에서 행을 반환할때 REVIEW_TF 테이블의 REST_ID의 행이 많은 순대로 REST_INFO의 행을 반환받고싶어
ChatGPT
REST_INFO 테이블에서 행을 반환할 때, REVIEW_TF 테이블의 REST_ID 열의 행이 많은 순서로 정렬하여 REST_INFO의 행을 반환하고 싶으시다면, LEFT JOIN을 사용하여 두 테이블을 연결하고, GROUP BY와 ORDER BY 절을 활용하면 됩니다.

다음은 해당 요구사항을 반영한 코드 예시입니다:

java
Copy code
StringBuilder sql = new StringBuilder("SELECT RI.IMAGE, RI.REST_NAME, RI.EXPLAIN, RI.BOSS_ADDRESS, RI.OPEN_HOUR, RI.NUM, RI.REST_ID, COUNT(RT.REST_ID) AS REVIEW_COUNT FROM " + tableName + " AS RI LEFT JOIN REVIEW_TF AS RT ON RI.REST_ID = RT.REST_ID WHERE ");
List<Object> params = new ArrayList<>();

// ... 필터링 조건 작성 부분은 그대로 유지합니다

sql.append("GROUP BY RI.IMAGE, RI.REST_NAME, RI.EXPLAIN, RI.BOSS_ADDRESS, RI.OPEN_HOUR, RI.NUM, RI.REST_ID ORDER BY COUNT(RT.REST_ID) DESC");

// DB에서 데이터 조회
List<Map<String, Object>> result = jdbcTemplate.queryForList(sql.toString(), params.toArray());

return result;
위의 코드에서 LEFT JOIN을 사용하여 REST_INFO와 REVIEW_TF 테이블을 연결하고, GROUP BY 절을 이용하여 REST_INFO의 열들을 그룹화합니다. 그리고 ORDER BY 절을 이용하여 REVIEW_TF 테이블의 REST_ID 행의 개수(REVIEW_COUNT)를 기준으로 내림차순으로 정렬합니다.

이렇게 하면 REVIEW_TF 테이블의 REST_ID의 행이 많은 순서로 REST_INFO 테이블의 행을 반환받을 수 있습니다.







     */
