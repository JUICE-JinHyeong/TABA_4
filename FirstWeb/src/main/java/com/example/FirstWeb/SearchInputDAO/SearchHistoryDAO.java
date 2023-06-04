package com.example.FirstWeb.SearchInputDAO;
import java.util.*;

public interface SearchHistoryDAO {
    void saveSearchHistory(SearchHistory searchHistory);
    List<SearchHistory> getSearchHistory();
    void updateSearchCount(Long id, int count);
}
