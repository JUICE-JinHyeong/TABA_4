import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/input/recent')
      .then(response => {
        setRecentSearches(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch recent searches:', error);
      });
  }, []);

  return (
    <div>
      <h2>Recent Searches</h2>
      {recentSearches.map((search, index) => (
        <p key={index}>{search.searchInput}: {search.count}</p>
      ))}
    </div>
  );
}

export default RecentSearches;
