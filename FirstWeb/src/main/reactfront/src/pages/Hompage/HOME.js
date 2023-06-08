import * as React from 'react';
import { styled } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchBar from '../SearchBar';
import MiddlePage from '../Middlepage/MIDDLE';
import ResultPage from '../Resultpage/RESULT';
import RecentSearch from './RecentSearch';

export default function App() {
  
 
  const HomePage = () => (
    <Box item sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={2} />
        <Grid item xs={8}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '70vh' }}
        >
          <Grid item>
            <h1>나리뷰</h1>
          </Grid>
          <Grid item>
            <SearchBar />
          </Grid>
          <Grid item>
            <RecentSearch/>
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Box>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/middlePage" element={<MiddlePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}
