// // SEARCH_INPUT.js
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function useFetchRecentSearches() {
//   const [recentSearches, setRecentSearches] = useState([]);

//   useEffect(() => {
//     axios.get('https://localhost:8080/api/recent')
//       .then(response => {
//         console.log(response.data);  // <- Add this line
//         setRecentSearches(response.data)
//       })
//       .catch(error => console.log(error));
//   }, []);

//   return recentSearches;
// }
import { useEffect, useState } from 'react';

export default function useFetchRecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:8080/api/recent');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log(response); // 응답 데이터 확인
          setRecentSearches(response);
        } else {
          console.error('요청 실패');
        }
      }
    };
    xhr.send();
  }, []);

  return recentSearches;
}
