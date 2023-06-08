// SEARCH_INPUT.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetchRecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    axios.get('/api/recent')
      .then(response => {
        console.log(response.data);  // <- Add this line
        setRecentSearches(response.data)
      })
      .catch(error => console.log(error));
  }, []);

  return recentSearches;
}
