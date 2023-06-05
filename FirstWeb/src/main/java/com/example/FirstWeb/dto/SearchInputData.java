package com.example.FirstWeb.dto;

import java.util.Date;

public class SearchInputData {

    private String searchInput;
    private Date date;

    public SearchInputData(String searchInput, Date date) {
        this.searchInput = searchInput;
        this.date = date;
    }

    public String getSearchInput() {
        return searchInput;
    }

    public void setSearchInput(String searchInput) {
        this.searchInput = searchInput;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
