// src/api.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const transformData = (data) => {
  let imageUrls = [];

  if (data.RE_IM_URL !== null && data.RE_IM_URL !== undefined) {
    const imageUrlsString = data.RE_IM_URL.replace(/\'/g, '').slice(1, -1); // Remove the square brackets and all single quotes
    imageUrls = imageUrlsString.split(', ');
  }
  
  return {
    review: data.REVIEW,
    avatar: data.PROFILE,
    myPlace: data.MY_PLACE,
    writer: data.WRITER,
    writeDay: data.WRITE_DAY,
    visitCount: data.VISIT_COUNT,
    label: data.LABEL,
    imageURL: imageUrls,
  };
};

  


export const REVIEW_TF = (restId) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/review', {
          params: {
            rest_id: restId
          },
        });

        let transformedData = response.data.map(transformData).filter(Boolean);
        
        setReviews(transformedData);
        console.log(response.data);

      } catch (error) {
        console.error('Failed to fetch data from DB:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [restId]); // Add label to the dependency array

  return { reviews, isLoading };
};


// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useReviews = (restId, label) => {
//     const [reviews, setReviews] = useState([]);

//     useEffect(() => {
//         const fetchReviews = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/review', {
//                     params: { rest_id: restId },
//                 });
//                 const filteredReviews = response.data.filter((review) => review.label === label);
//                 setReviews(filteredReviews);
//             } catch (error) {
//                 console.error('Failed to fetch reviews', error);
//             }
//         };

//         fetchReviews();
//     }, [restId, label]);

//     return reviews;
// };

// export default useReviews;