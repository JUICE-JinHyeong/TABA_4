import React from "react";
import { Box } from "@mui/material";
import { TagCloud } from "react-tagcloud";

const data = [
  { value: 'JavaScript', count: 38 },
  { value: 'React', count: 30 },
  { value: 'Nodejs', count: 28 },
  { value: 'Express.js', count: 25 },
  { value: 'HTML5', count: 33 },
  { value: 'MongoDB', count: 18 },
  { value: 'CSS3', count: 20 },
];

const SimpleCloud = () => (
  <Box width="100%" height="100px">
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={data}
    />
  </Box>
);

export default SimpleCloud;
