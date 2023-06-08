import React from 'react';
import { useReviews } from '../../api/useReviews';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

const Review = ({ review, writer }) => (
  <div>
    <h2>{writer}</h2>
    <p>{review}</p>
  </div>
);

const ReviewList = ({ restId }) => {
  const { reviews, isLoading } = useReviews(restId);
console.log(reviews)
  if (isLoading) {
    return <CircularProgress />;
  }

  if (reviews.length === 0) {
    return <p>No reviews found</p>;
  }

  return (
    <List>
      {reviews.map((review, index) => (
        <ListItem key={index}>
          <Avatar src={review.avater} alt={review.writer} />
          <ListItemText
            primary={<Review review={review.review} writer={review.writer} />}
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