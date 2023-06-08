// RecentSearches.js
import React from 'react';
import useFetchRecentSearches from '../../api/SEARCH_INPUT';

export default function RecentSearches() {
  const recentSearches = useFetchRecentSearches();

  return (
    <div>
      <h2>Recent Searches</h2>
      <ul>
        {Object.values(recentSearches).map((search, index) => (
          <li key={index}>
            <strong>Search Input:</strong> {search.searchInput}, 
            <strong> Search Count:</strong> {search.searchCount}
          </li>
        ))}
      </ul>
    </div>
  );
}

