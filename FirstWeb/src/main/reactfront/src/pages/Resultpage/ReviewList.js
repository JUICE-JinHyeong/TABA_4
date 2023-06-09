import React, { useState } from 'react';
import { useReviews } from '../../api/useReviews';
import { Avatar, List, ListItem, ListItemText, Skeleton, CircularProgress } from '@mui/material';


const Review = ({ review, writer, avatar, images }) => {
  const [imgLoading, setImgLoading] = useState(Array(images.length).fill(true));

  const handleImageLoad = (index) => {
    setImgLoading(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={avatar} alt={writer} />
        <h2 style={{ marginLeft: '10px' }}>{writer}</h2>
      </div>
      <p>{review}</p>
      <div style={{display: 'flex', overflowX: 'auto'}}>
        {images.map((image, index) => (
          <div key={index} style={{ marginRight: '5px' }}>
            <img src={image} alt={`review ${index}`} onLoad={() => handleImageLoad(index)} style={{ height: '150px', width: 'auto', borderRadius: '5px' }}/>
            {imgLoading[index] && <CircularProgress />}
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewList = ({ restId, label }) => {  
  const { reviews, isLoading } = useReviews(restId, label); 

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100vh" height="auto" />;
  }

  if (reviews.length === 0) {
    return <p>No reviews found</p>;
  }

  return (
    <List>
      {reviews.map((review, index) => (
        <ListItem divider key={index}>
          <ListItemText
            primary={<Review review={review.review} writer={review.writer} avatar={review.avatar} images={review.imageURL || []} />}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ReviewList;

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