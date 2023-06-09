// RecentSearches.js
import React from 'react';
import useFetchRecentSearches from '../../api/SEARCH_INPUT';

export default function RecentSearches() {
  const recentSearches = useFetchRecentSearches();

  return (
    <div>
      <h2>일주일간 검색 순위</h2>
      <ol>
        {Object.values(recentSearches).map((search, index) => (
          <li key={index}>
            <strong> Search Input: {search.searchInput}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}

