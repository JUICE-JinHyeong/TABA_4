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

  const defaultImage = '/NO_IMAGE_6.png';

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
            style={{ marginRight: '5px', marginTop: '15px'}}

          >
            <img
              src={imageUrl || defaultImage} // imageUrl가 존재하지 않으면 defaultImage를 사용합니다.
              alt={`Image ${index}`}
              onLoad={() => handleImageLoad(index)}
              style={{ width: 'auto', height: imageHeight, maxHeight: '350px', borderRadius: '5px' }}
            />
            {imgLoading[index] && <CircularProgress />}
          </div>
        );
      })}
    </div>
  );
}
