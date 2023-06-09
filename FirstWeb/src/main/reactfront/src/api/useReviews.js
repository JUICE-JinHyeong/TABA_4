// src/api.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const transformData = (data) => {
    if (data.RE_IM_URL) {
      const imageUrlsString = data.RE_IM_URL.slice(1, -1); // Remove the square brackets
      const imageUrls = imageUrlsString.split(', ');
  
      return {
        review: data.REVIEW,
        avatar: data.PROFILE,
        myPlace: data.MY_PLACE,
        writer: data.WRITER,
        writeDay: data.WRITE_DAY,
        label: data.LABEL,
        imageURL: imageUrls,
      };
    } else {
      console.log('RE_IM_URL is null');
      return {
        review: data.REVIEW,
        avater: data.PROFILE,
        myPlace: data.MY_PLACE,
        writeDay: data.WRITE_DAY,
        writer: data.WRITER,
        label: data.LABEL,
        imageURL: [], // Set an empty array as the default value for imageURL
      };
    }
  };
  


export const useReviews = (restId) => {
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

          const transformedData = response.data.map(transformData).filter(Boolean);
          setReviews(transformedData);
          console.log(response.data);

        } catch (error) {
          console.error('Failed to fetch data from DB:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchReviews();
    }, [restId]);
  
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