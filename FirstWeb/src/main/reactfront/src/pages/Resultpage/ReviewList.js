import { useReviews } from '../../api/useReviews';

import React, { useState } from 'react';
import { Avatar, Grid, List, ListItem, ListItemText, CircularProgress, Skeleton } from '@mui/material';

const Review = ({ review, writer, writeDay, visitCount, avatar, images }) => {
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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={1}>
          <Avatar src={avatar} alt={writer} style={{ width: '50px', height: '50px' }} />
        </Grid>
        <Grid item xs={10}>
          <h4 style={{ marginBottom: '1px' }}>{writer}</h4>
          <h5 style={{ marginTop: '1px' }}>{visitCount}</h5>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p>{review}</p>
      </Grid>
      
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        {images.map((image, index) => (
          <div key={index} style={{ marginRight: '5px' }}>
            <img src={image} alt={`review ${index}`} onLoad={() => handleImageLoad(index)} style={{ height: '150px', width: 'auto', borderRadius: '5px' }} />
            {imgLoading[index] && <CircularProgress />}
          </div>
        ))}
      </div>
      <Grid item xs={12}>
        <h5 style={{ marginTop: '1px' }}>{writeDay}</h5>
      </Grid>
    </div >
    
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
            primary={
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <Review review={review.review} writer={review.writer} writeDay={review.writeDay} visitCount={review.visitCount} avatar={review.avatar} images={review.imageURL || []} />
                </Grid>
              </Grid>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ReviewList;

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