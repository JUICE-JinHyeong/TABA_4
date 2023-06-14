import * as React from 'react';
import { styled } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchBar from '../SearchBar';
import MiddlePage from '../Middlepage/MIDDLE';
import ResultPage from '../Resultpage/RESULT';
import RecentSearch from './HOME_RecentSearch';
import './HOME.css';

export default function App() {

  const StyledApp = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    width: '100%',
    height: '3vh',
  }));

  const StyledText = styled('div')(({ theme }) => ({
    color: 'black',
    fontSize: '1.2rem',
    fontWeight: 500,
    textAlign: 'center',
  }));
  const HomePage = () => (
    <StyledApp>
      <StyledText>Review.restaurant</StyledText>
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

              <img src="/logo_1.png" alt="Logo" />
            </Grid>
            <Grid item>
              <SearchBar />
            </Grid>
            <Grid item>
              <RecentSearch />
              {/* <RecentSearch/> */}
            </Grid>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Box>
    </StyledApp>
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
