import React, { useEffect, useState } from 'react';
import useFetchRecentSearches from '../../api/RECENT_SEARCH';
import { useNavigate } from 'react-router-dom';
export default function RecentSearch() {
  const recentSearches = useFetchRecentSearches();
  const navigate = useNavigate();

  const handleSearchItemClick = (searchInput,selectedOption) => {
    navigate(`/middlePage?selectedOption=${selectedOption}&searchInput=${searchInput}`);
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
              onClick={() => handleSearchItemClick(search.searchInput,search.selectedOption)}
            >
              <strong className="cursor logo">{search.searchInput}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}
