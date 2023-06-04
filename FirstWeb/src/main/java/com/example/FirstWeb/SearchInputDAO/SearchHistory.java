package com.example.FirstWeb.SearchInputDAO;
import java.util.*;

public class SearchHistory {
    private Long id;
    private String searchInput;
    private int count;
    private Date date;

    // 생성자, getter/setter 생략
    public SearchHistory(Long id, String searchInput, int count, Date date) {
        this.id = id;
        this.searchInput = searchInput;
        this.count = count;
        this.date = date;
    }
    public Long getId() {
        return id;
    }



    public void setId(Long id) {
        this.id = id;
    }

    public String getSearchInput() {
        return searchInput;
    }

    public void setSearchInput(String searchInput) {
        this.searchInput = searchInput;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}