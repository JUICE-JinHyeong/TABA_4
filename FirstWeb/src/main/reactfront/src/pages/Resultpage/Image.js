import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function CustomImageList({ data }) {
  const [imgLoading, setImgLoading] = useState(Array(data.imageURL.length).fill(true));

  const handleImageLoad = (index) => {
    setImgLoading(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  if (!data || !data.imageURL) {
    return null;
  }

  const imageURL = data.imageURL;

  return (
    <div style={{ display: 'flex', overflowX: 'auto' }}>
      {imageURL.map((img, index) => {
        const imageUrl = img.replace(/'/g, ""); // 작은 따옴표를 제거합니다.
        return (
          <div key={index} style={{ marginRight: '5px' }}>
            <img src={imageUrl} alt={`Image ${index}`} onLoad={() => handleImageLoad(index)} style={{ width: 'auto', height: '30vh', borderRadius: '5px' }}/>
            {imgLoading[index] && <CircularProgress />}
          </div>
        );
      })}
    </div>
  );
}
