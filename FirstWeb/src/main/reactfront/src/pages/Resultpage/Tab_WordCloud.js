import React, { useState, useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import cloud from 'd3-cloud';
import { scaleLinear } from 'd3-scale';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { transition } from 'd3-transition';
import CloseIcon from '@mui/icons-material/Close';
import Tab_ReviewList from './Tab_ReviewList';
import Skeleton from '@mui/material/Skeleton';
import { WordCloud } from '../../api/WORD_CLOUD';
import './RESULT.css';

const getRandomColor = () => {
  let color = '#';
  let random;
  for (let i = 0; i < 6; i++) {
    if (i === 0) {
      random = Math.floor(Math.random() * 6) + 6; // 6 to 11 (6,7,8,9,A,B), to avoid red colors
    } else {
      random = Math.floor(Math.random() * 16); // 0 to 15
    }
    color += random.toString(16).toUpperCase();
  }
  return color;
};

const Tab_WordCloud = ({ restId }) => {
  const svgRef = useRef();
  const wordcloud = WordCloud({ restId });
  const isLoading = wordcloud.length === 0;
  const width = 500;
  const height = 500;
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedWordFinder, setSelectedWordFinder] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && wordcloud) {
      const wordCounts = wordcloud.map((item) => item.count);
      const sizeScale = scaleLinear().domain([Math.min(...wordCounts), Math.max(...wordCounts)]).range([20, 100]);

      cloud()
        .size([width, height])
        .words(
          wordcloud.map((d) => ({
            text: d.word,
            size: sizeScale(d.count),
            finder: d.finder,
            color: getRandomColor(),
          }))
        )
        .rotate(0)
        .fontSize((d) => d.size)
        .padding(10)
        .on('end', (words) => {
          const wordCloudSVG = select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

          const textElements = wordCloudSVG
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .style('font-size', (d) => `${d.size}px`)
            .attr('text-anchor', 'middle')
            .attr('transform', (d) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
            .text((d) => d.text)
            .on('click', handleWordClick)
            .on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut)
            .classed('wordcloud-text', true)
            .style('fill', (d) => d.color);

          function handleWordClick(event, d) {
            setSelectedWord(d.text);
            setSelectedWordFinder(d.finder);
            setOpen(true);
          }

          function handleMouseOver(event, d) {
            select(this)
              .attr('font-weight', 'bold')
              .transition()
              .duration(200)
              .style('fill', 'red'); // Change this line
          }

          function handleMouseOut(event, d) {
            select(this)
              .attr('font-weight', 'normal')
              .transition()
              .duration(200)
              .style('fill', d.color); // Use the original color here
          }
        })
        .start();
    }
  }, [isLoading]);

  const handleClose = () => {
    setSelectedWord(null);
    setSelectedWordFinder(null);
    setOpen(false);
  };

  if (isLoading) {
    return <Skeleton variant="rectangular" width={width} height={height} />;
  }

  return (
    <div>
      <svg ref={svgRef}></svg>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Review List - {selectedWord}
          <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Tab_ReviewList restId={restId} label="3" finder={selectedWordFinder} maxHeight="400px" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tab_WordCloud;
