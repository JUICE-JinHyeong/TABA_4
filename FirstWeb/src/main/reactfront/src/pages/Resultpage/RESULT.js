import TabPanel from './RESULT_Tab';
import { Container, Grid, Box, Paper } from '@mui/material';
import * as React from 'react';
import { styled, makeStyles } from '@mui/material/styles';
import SearchBar from '../SearchBar';
import Image from './RESULT_Image';
import Table from './RESULT_Table';
import { useNavigate,useLocation } from 'react-router-dom';
import './RESULT.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function ResultPage() {
  const location = useLocation();
  const data = location.state?.data; //Card 클릭시 REST_INFO 테이블의 data가 전달된다.
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };

  
  return (
    <Container style={{ height: "200vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={2}> {/* 왼쪽 로고란 */}
          <Box display="flex" alignItems="center" height="100%">
          {/* <h1 onClick={handleLogoClick} className="pointer_cursor logo">Re</h1> */}
          <img onClick={handleLogoClick}  className="pointer_cursor logo" src="/logo_3.png" alt="Logo" style={{ width: '100%' }} />
          </Box>
        </Grid>
        <Grid item xs={10}> {/* 검색창 */}
          <Box display="flex" alignItems="center" height="100%">
            <SearchBar />
          </Box>
        </Grid>
        <Grid item xs={4} sx={{overflowX: 'auto'}}> 
          <Image data={data} />
          <h1 className='store_title'>{data.title}</h1>
          <Table data={data}/>
        </Grid>
        <Grid item xs={8}> {/* 오른쪽 워드 클라우드 란 */}
          <Item>
            <TabPanel data={data}/>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}
