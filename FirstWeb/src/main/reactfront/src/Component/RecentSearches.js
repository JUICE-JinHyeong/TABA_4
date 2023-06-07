import React, { useEffect, useState } from 'react';

function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    fetch('/api/recent')
      .then(response => response.json())
      .then(data => setRecentSearches(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Recent Searches</h2>
      <ul>
        {recentSearches.map((search, index) => (
          <li key={index}>
            <strong>Search Input:</strong> {search.searchInput}, 
            <strong> Search Count:</strong> {search.searchCount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentSearches;
