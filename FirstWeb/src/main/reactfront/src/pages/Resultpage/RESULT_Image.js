import React, { useState, useRef, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function CustomImageList({ data }) {
  const [imgLoading, setImgLoading] = useState(Array(data.imageURL.length).fill(true));
  const [isHovered, setIsHovered] = useState(false);
  const imageListRef = useRef(null);

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


  if (!data || !data.imageURL) {
    return null;
  }

  const imageURL = data.imageURL;
  const imageHeight = isHovered ? '50vh' : '30vh';

  return (
    <div
      style={{ display: 'flex', overflowX: 'auto' }}
      ref={imageListRef}
    >
      {imageURL.map((img, index) => {
        const imageUrl = img.replace(/'/g, ''); // Remove single quotes
        return (
          <div
            key={index}
            style={{ marginRight: '5px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={imageUrl}
              alt={`Image ${index}`}
              onLoad={() => handleImageLoad(index)}
              style={{ width: 'auto', height: imageHeight, borderRadius: '5px' }}
            />
            {imgLoading[index] && <CircularProgress />}
          </div>
        );
      })}
    </div>
  );
}
