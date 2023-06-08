import { useState, useEffect } from 'react';
import axios from 'axios';

const useReviews = (restId, label) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:8080/review', {
                    params: { rest_id: restId },
                });
                const filteredReviews = response.data.filter((review) => review.label === label);
                setReviews(filteredReviews);
            } catch (error) {
                console.error('Failed to fetch reviews', error);
            }
        };

        fetchReviews();
    }, [restId, label]);

    return reviews;
};

export default useReviews;
