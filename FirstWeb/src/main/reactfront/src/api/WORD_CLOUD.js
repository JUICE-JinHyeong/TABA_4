import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const WordCloud = restId  => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:8080/wordcloud', 
                    { params: { rest_id: restId } }
                );

                const transformData = (data) => {
                    return {
                        word: data.WORD,
                        count: data.WORDCOUNT
                    };
                };
                
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


