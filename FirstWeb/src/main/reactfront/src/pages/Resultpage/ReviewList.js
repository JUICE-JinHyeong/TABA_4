import Collapse from '@mui/material/Collapse';
import React, { useState } from 'react';
import useReviews from '../../api/useReviews';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Link, Divider, IconButton } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // carousel styles

const ReviewList = ({ restId, label }) => {
    const reviews = useReviews(restId, label);
    const [expandedReviewId, setExpandedReviewId] = useState(null);

    const handleExpandReview = (reviewId) => {
        if (expandedReviewId === reviewId) {
            setExpandedReviewId(null);
        } else {
            setExpandedReviewId(reviewId);
        }
    };

    return (
        <List>
            {reviews.map((review, index) => {
                let imageUrls = [];

                // Parse the URLs string into an array
                if (review.reImUrl) {
                    // remove brackets and split the reImUrl string into an array
                    const imageUrlsString = review.reImUrl.slice(1, -1); // Remove the square brackets
                    imageUrls = imageUrlsString.split(',').map(url => url.trim().replace(/^'/, '').replace(/'$/, ''));
                }

                return (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemAvatar>
                                <Link href={review.myPlace} target="_blank">
                                    <Avatar alt={review.writer} src={review.profile} />
                                </Link>
                            </ListItemAvatar>
                            <ListItemText
                                primary={review.writer}
                                secondary={
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span
                                                onClick={() => handleExpandReview(index)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {review.review}
                                            </span>
                                            {imageUrls.length > 0 && (
                                                <>
                                                    {expandedReviewId === index ? (
                                                        <IconButton onClick={() => handleExpandReview(index)}>
                                                            <ExpandLessIcon />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton onClick={() => handleExpandReview(index)}>
                                                            <ExpandMoreIcon />
                                                        </IconButton>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        {expandedReviewId === index && imageUrls.length > 0 && (
                                            <Carousel>
                                                {imageUrls.map((url, i) => (
                                                    <div key={i}>
                                                        <img src={url} alt={`Image ${i}`} style={{ maxWidth: '100%', height: 'auto' }} />
                                                    </div>
                                                ))}
                                            </Carousel>
                                        )}
                                    </>
                                }
                            />
                        </ListItem>
                        {index !== reviews.length - 1 && <Divider variant="middle" />}
                    </React.Fragment>
                );
            })}
        </List>
    );
};

export default ReviewList;
