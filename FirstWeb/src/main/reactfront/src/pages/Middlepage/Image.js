import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box } from '@mui/material';


export default function CustomImageList({ data }) {
  if (!data || !data.imageURL) {
    return null;
  }

  const imageURL = data.imageURL;

  return (
    <Carousel>
      {imageURL.map((img, index) => {
        const imageUrl = img.replace(/'/g, ""); // 작은 따옴표를 제거합니다.
        return (
          <Box key={index} component="div">
            <img src={imageUrl} alt={`Image ${index}`} />
          </Box>
        );
      })}
    </Carousel>
  );
    }