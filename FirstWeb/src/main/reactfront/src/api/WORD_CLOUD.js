import React, { useEffect, useState } from 'react';
import axios from 'axios';

const transformData = (data) => {
    let finder = [];

    if (data.WORD_FINDER !== null && data.WORD_FINDER !== undefined) {
        const wordlist = data.WORD_FINDER.replace(/\'/g, '').slice(1, -1); // Remove the square brackets and all single quotes
        finder = wordlist.split(', ');
        console.log(finder)
    }
    return {
        word: data.WORD,
        count: data.WORD_COUNT,
        finder: finder
    };
};

export const WordCloud = ({ restId }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'api/wordcloud',
                    { params: { rest_id: restId } }
                );


                console.log(result.data); // 응답 데이터 확인
                let transformedData = result.data.map(transformData);
                setData(transformedData);

            } catch (error) {
                console.error('Error fetching data from server', error);
            }
        };

        fetchData();
    }, [restId]);

    return data;
};





// import React, { useEffect, useState } from 'react';

// export const WordCloud = ({ restId }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', `https://localhost:8080/wordcloud?rest_id=${restId}`);
//         xhr.onreadystatechange = function () {
//           if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//               const result = JSON.parse(xhr.responseText);
//               console.log(result); // 응답 데이터 확인
//               let transformedData = result.map(transformData);
//               setData(transformedData);
//             } else {
//               console.error('요청 실패');
//             }
//           }
//         };
//         xhr.send();
//       } catch (error) {
//         console.error('Error fetching data from server', error);
//       }
//     };

//     fetchData();
//   }, [restId]);

//   const transformData = (data) => {
//     let finder = [];

//     if (data.WORD_FINDER !== null && data.WORD_FINDER !== undefined) {
//       const wordlist = data.WORD_FINDER.replace(/'/g, '').slice(1, -1); // Remove the square brackets and all single quotes
//       finder = wordlist.split(', ');
//       console.log(finder);
//     }
//     return {
//       word: data.WORD,
//       count: data.WORD_COUNT,
//       finder: finder
//     };
//   };

//   return data;
// };


