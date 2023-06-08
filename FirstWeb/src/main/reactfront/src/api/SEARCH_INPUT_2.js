import React, { useEffect, useState } from 'react';
import './SEARCH_INPUT_2.css';

function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    fetch('/api/recent')
      .then(response => response.json())
      .then(data => {
        const sortedData = data.slice(0, 10).sort((a, b) => b.searchCount - a.searchCount);
        setRecentSearches(sortedData);
      })
      .catch(error => console.log(error));
  }, []);

  const column1 = recentSearches.slice(0, 5);
  const column2 = recentSearches.slice(5, 10);

  return (
    <div className="SEARCH_INPUT_2">
      <h2 className="recent-searches-title">인기 검색어</h2>
      <div className="recent-searches-list">
        <ol className="recent-searches-column">
          {column1.map((search, index) => (
            <div key={index} className="recent-searches-item">
              {index + 1}. {search.searchInput}
            </div>
          ))}
        </ol>
        <ol className="recent-searches-column" start="6">
          {column2.map((search, index) => (
            <div key={index} className="recent-searches-item">
              {index + 6}. {search.searchInput}
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RecentSearches;