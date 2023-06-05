package com.example.FirstWeb.Service;

import com.example.FirstWeb.model.SearchInputCount;
import com.example.FirstWeb.Repository.SearchInputCountRepository;
import com.example.FirstWeb.Repository.SearchInputCountDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.FirstWeb.dto.SearchInputData;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class SearchService {

    private final SearchInputCountRepository searchInputCountRepository;
    private final SearchInputCountDateRepository searchInputCountDateRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public SearchService(SearchInputCountRepository searchInputCountRepository,
                         SearchInputCountDateRepository searchInputCountDateRepository,
                         RestTemplate restTemplate) {
        this.searchInputCountRepository = searchInputCountRepository;
        this.searchInputCountDateRepository = searchInputCountDateRepository;
        this.restTemplate = restTemplate;
    }

    public void saveSearch(String searchInput) {
        SearchInputCount searchInputCount = searchInputCountRepository.findBySearchInput(searchInput);

        if (searchInputCount != null) {
            // If the search input exists, increase the count
            searchInputCount.setCount(searchInputCount.getCount() + 1);
        } else {
            // If the search input does not exist, create a new record
            searchInputCount = new SearchInputCount();
            searchInputCount.setSearchInput(searchInput);
            searchInputCount.setCount(1);
            searchInputCount.setDate(new Date());
        }

        searchInputCountRepository.save(searchInputCount);
        sendSearchDataToServer(searchInput);
    }

    public List<SearchInputCount> getTop5RecentSearches() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, -7);
        Date startDate = calendar.getTime();
        Date endDate = new Date();

        return searchInputCountDateRepository.findByDateBetweenOrderByCountDesc(startDate, endDate);
    }

    private void sendSearchDataToServer(String searchInput) {
        String url = "http://localhost:8080/api/input";
        SearchInputData requestData = new SearchInputData(searchInput, new Date());
        restTemplate.postForObject(url, requestData, Void.class);
    }
}
