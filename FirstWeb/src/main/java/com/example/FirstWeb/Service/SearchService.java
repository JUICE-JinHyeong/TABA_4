package com.example.FirstWeb.Service;

import com.example.FirstWeb.model.SearchInputCount;
import com.example.FirstWeb.repository.SearchInputCountRepository;
import com.example.FirstWeb.dto.SearchInputData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


import java.util.Date;
@Service
public class SearchService {
    @PersistenceContext
    private EntityManager entityManager;
    private final SearchInputCountRepository searchInputCountRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public SearchService(SearchInputCountRepository searchInputCountRepository, RestTemplate restTemplate) {
        this.searchInputCountRepository = searchInputCountRepository;
        this.restTemplate = restTemplate;
    }

    private void sendSearchDataToServer(String searchInput) {
        String url = "http://localhost:8080/api/input";
        // Create request body
        SearchInputData requestData = new SearchInputData(searchInput, new Date());

        // Send POST request to server
        restTemplate.postForObject(url, requestData, Void.class);
    }

    @Transactional
    public void saveSearch(String searchInput) {

            SearchInputCount searchInputCount = searchInputCountRepository.findBySearchInput(searchInput);

            if (searchInputCount != null) {
                // If the search input exists, increase the count
                searchInputCount.setCount(searchInputCount.getCount() + 1);
            } else {
                // If the search input does not exist, create a new record
                searchInputCount = SearchInputCount.builder()
                        .searchInput(searchInput)
                        .count(1)
                        .date(new Date())
                        .build();
            }

            searchInputCountRepository.save(searchInputCount); // 저장된 엔티티 수정 후 다시 저장

            searchInputCountRepository.flush(); // 변경 사항을 즉시 데이터베이스에 반영(쓰기 지연 현상 x)

            // Send data to server using restTemplate
            sendSearchDataToServer(searchInput);



    }
}
