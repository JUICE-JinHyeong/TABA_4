import { WordCloud as fetchWordCloud } from '../../api/WORD_CLOUD'
import React, { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import cloud from 'd3-cloud';
import { scaleLinear } from 'd3-scale';
import Skeleton from '@mui/material/Skeleton';

const Tab_WordCloud = ({ data, label }) => {
    const svgRef = useRef();
    const { wordcloud, isLoading } = fetchWordCloud(data, label);
    const width = 500;
    const height = 500;
    useEffect(() => {
        if (!isLoading) {
            const drawWordCloud = () => {
                const wordCounts = wordcloud.map(item => item.count);
                const sizeScale = scaleLinear().domain([Math.min(...wordCounts), Math.max(...wordCounts)]).range([20, 100]);

                cloud()
                    .size([width, height])
                    .words(wordcloud.map(d => ({ text: d.word, size: sizeScale(d.count) })))
                    .rotate(0)
                    .fontSize(d => d.size)
                    .on('end', words => {
                        select(svgRef.current)
                            .attr('width', width)
                            .attr('height', height)
                            .append('g')
                            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
                            .selectAll('text')
                            .data(words)
                            .enter().append('text')
                            .style('font-size', d => d.size + 'px')
                            .attr('text-anchor', 'middle')
                            .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
                            .text(d => d.text);
                    })
                    .start();
            };

            drawWordCloud();
        }
    }, [isLoading, wordcloud]);

    if (isLoading) {
        return <Skeleton variant="rectangular" width="100%" height="auto" />;
    }

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default Tab_WordCloud;
