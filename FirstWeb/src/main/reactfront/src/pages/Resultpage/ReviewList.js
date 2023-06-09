import React, { useState } from 'react';
import { useReviews } from '../../api/useReviews';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Review = ({ review, writer, images }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h2>{writer}</h2>
      <p>{review}</p>
      {images.length > 0 && 
        <Button onClick={handleExpandClick}>
          Show Images
        </Button>
      }
      {expanded && 
        <Accordion expanded={expanded}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Images</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Carousel>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`review ${index}`} />
                </div>
              ))}
            </Carousel>
          </AccordionDetails>
        </Accordion>
      }
    </div>
  );
};

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
        <ListItem divider key={index}>
          <Avatar src={review.avatar} alt={review.writer} />
          <ListItemText
            primary={<Review review={review.review} writer={review.writer} images={review.imageURL || []} />}
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