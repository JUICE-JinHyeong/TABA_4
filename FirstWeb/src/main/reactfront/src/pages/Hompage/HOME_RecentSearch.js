import React, { useEffect, useState } from 'react';
import useFetchRecentSearches from '../../api/RECENT_SEARCH';
import { useNavigate } from 'react-router-dom';
import { searchFromDB } from '../../api/REST_INFO'; 

export default function RecentSearch() {
  const recentSearches = useFetchRecentSearches();
  const navigate = useNavigate();

  const handleSearchClick = async (searchInput) => {
    let data = await searchFromDB('식당', searchInput);
    if (data.length === 1) {
      navigate(`/result`, { state: { data: data[0] } });
    } else if (data.length > 1) {
      navigate(`/middlePage?searchOption=식당&searchInput=${searchInput}`);
    } else {
      data = await searchFromDB('음식', searchInput);
      if (data.length >= 1) {
        navigate(`/middlePage?searchOption=음식&searchInput=${searchInput}`);
      }
    }
  }

  return (
    <div className="container">
      <h2>인기 검색어</h2>
      <ol>
      {Object.values(recentSearches)
          .slice(0, 5)
          .map((search, index) => (
            <li 
              key={index} 
              className="item"
              onClick={() => handleSearchClick(search.searchInput)}
            >
              <strong className="cursor logo">{search.searchInput}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}
