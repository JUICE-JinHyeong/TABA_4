import React, { useState, useRef, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function CustomImageList({ data }) {
  const [imgLoading, setImgLoading] = useState(Array(data.imageURL.length).fill(true));
  const [isHovered, setIsHovered] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
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

  const handleScroll = (event) => {
    event.preventDefault(); // Prevent default page scroll
    event.stopPropagation(); // Stop event propagation

    const delta = Math.sign(event.deltaY);
    const scrollSpeed = 200; // Adjust scroll speed as needed
    const scrollAmount = delta * scrollSpeed;
    imageListRef.current.scrollLeft += scrollAmount;
    setScrollLeft(imageListRef.current.scrollLeft);
  };

  useEffect(() => {
    imageListRef.current.scrollLeft = scrollLeft;
  }, [scrollLeft]);

  if (!data || !data.imageURL) {
    return null;
  }

  const imageURL = data.imageURL;
  const imageHeight = isHovered ? '50vh' : '30vh';

  return (
    <div
      style={{ display: 'flex', overflowX: 'auto' }}
      onWheel={handleScroll}
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
