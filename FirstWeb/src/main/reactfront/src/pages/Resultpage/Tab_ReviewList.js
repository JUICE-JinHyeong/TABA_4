import { REVIEW_TF } from '../../api/REVIEW_TF';
import React, { useState } from 'react';
import { Avatar, Grid, List, ListItem, ListItemText, CircularProgress, Skeleton } from '@mui/material';

const Review = ({ review, writer, writeDay, visitCount, avatar, images, myPlace, finder }) => {
  const [imgLoading, setImgLoading] = useState(Array(images.length).fill(true));
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = (index) => {
    setImgLoading(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getImageHeight = () => {
    return isHovered ? 'imageHeight' : 'imageHeight' ;
  };

  const handleAvatarClick = () => {
    // Open the link in a new tab
    window.open(myPlace, '_blank');
  };

  const highlightText = (text) => {
    if (!finder || finder.length === 0) {
      return text;
    }

    const regex = new RegExp(`(${finder.join('|')})`, 'gi');
    return text.replace(regex, '<span style="background-color: yellow">$1</span>');
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={1}>
          <Avatar src={avatar} alt={writer} style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={handleAvatarClick} />
        </Grid>
        <Grid item xs={10}>
          <h4 style={{ marginBottom: '1px' }}>{writer}</h4>
          <h5 style={{ marginTop: '1px' }}>{visitCount}</h5>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p dangerouslySetInnerHTML={{ __html: highlightText(review) }} />
      </Grid>
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{ marginRight: '5px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={image}
              alt={`review ${index}`}
              onLoad={() => handleImageLoad(index)}
              style={{ height: getImageHeight(), maxHeight: '400px', width: 'auto', borderRadius: '5px' }}

            />
            {imgLoading[index] && <CircularProgress />}
          </div>
        ))}
      </div>
      <Grid item xs={12}>
        <h5 style={{ marginTop: '1px' }}>{writeDay}</h5>
      </Grid>
    </div>
  );
};

const ReviewList = ({ restId, label, finder }) => {
  const { reviews, isLoading } = REVIEW_TF(restId);

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100vh" height="auto" />;
  }

  if (reviews.length === 0) {
    return <p>No reviews found</p>;
  }

  let filteredReviews = [];

  if (finder) {
    filteredReviews = reviews.filter(review => {
      const found = finder.some(word => review.review.includes(word));
      return found;
    });
  } else {
    filteredReviews = reviews.filter(review => review.label === label);
  }

  if (filteredReviews.length === 0) {
    return <p>No matching reviews found</p>;
  }

  return (
    <List>
      {filteredReviews.map((review, index) => (
        <ListItem divider key={index}>
          <ListItemText
            primary={
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Review
                    review={review.review}
                    writer={review.writer}
                    writeDay={review.writeDay}
                    visitCount={review.visitCount}
                    avatar={review.avatar}
                    images={review.imageURL || []}
                    myPlace={review.myPlace}
                    finder={finder}
                  />
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
