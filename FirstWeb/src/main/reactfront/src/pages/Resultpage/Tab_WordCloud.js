import { WordCloud } from '../../api/WORD_CLOUD';
import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import cloud from 'd3-cloud';
import { scaleLinear } from 'd3-scale';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Tab_ReviewList from './Tab_ReviewList';
import { transition } from 'd3-transition';
import Skeleton from '@mui/material/Skeleton';
import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

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
      const wordCounts = wordcloud.map(item => item.count);
      const sizeScale = scaleLinear().domain([Math.min(...wordCounts), Math.max(...wordCounts)]).range([20, 100]);

      cloud()
        .size([width, height])
        .words(wordcloud.map(d => ({ text: d.word, size: sizeScale(d.count), finder: d.finder })))
        .rotate(0)
        .fontSize(d => d.size)
        .padding(10)
        .on('end', words => {
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
            .style('font-size', d => `${d.size}px`)
            .attr('text-anchor', 'middle')
            .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
            .text(d => d.text)
            .on('click', handleWordClick)
            .on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut);

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
              .style('fill', 'darkblue');
          }

          function handleMouseOut(event, d) {
            select(this)
              .attr('font-weight', 'normal')
              .transition()
              .duration(200)
              .style('fill', 'black');
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
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth> {/* maxWidth와 fullWidth 속성 추가 */}
        <DialogTitle>
          Review List - {selectedWord}

          <IconButton
            style={{ position: "absolute", right: 20 }}  // 'right' 값을 조절하여 버튼의 위치를 변경합니다.
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Tab_ReviewList restId={restId} label="3" finder={selectedWordFinder} maxHeight="400px" /> {/* maxHeight 속성 추가 */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tab_WordCloud;
