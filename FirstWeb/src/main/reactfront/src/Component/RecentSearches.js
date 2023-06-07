import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentSearchComponent = () => {
  const [searchInputs, setSearchInputs] = useState([]);

  useEffect(() => {
    const fetchRecentSearchInputs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/recent');
        setSearchInputs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentSearchInputs();
  }, []);

  return (
    <div>
      <h2>일주일간 검색 순위</h2>
      <ul>
        {searchInputs.map((searchInput, index) => (
          <li key={index}>
            {searchInput[0]} 는 최근 일주일간 {searchInput[1]} 번 검색되었습니다
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearchComponent;
