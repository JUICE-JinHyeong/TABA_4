import TabPanel from './TabPanel';
import { Container, Grid, Box, Paper } from '@mui/material';
import * as React from 'react';
import { styled, makeStyles } from '@mui/material/styles';
import SearchBar from '../SearchBar';
import Image from '../Middlepage/Image';
import Table from '../Middlepage/Table';
import { useNavigate,useLocation } from 'react-router-dom';




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
    <Container style={{ height: "125vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={2}> {/* 왼쪽 로고란 */}
          <Box display="flex" alignItems="center" height="100%">
            <h1 onClick={handleLogoClick}>Re.staurant</h1>
          </Box>
        </Grid>
        <Grid item xs={10}> {/* 검색창 */}
          <Box display="flex" alignItems="center" height="100%">
            <SearchBar />
          </Box>
        </Grid>
        <Grid item xs={4} sx={{overflowX: 'auto'}}> 
          <h1>{data.title}</h1>
          <Image data={data} />
          <Table data={data}/>
        </Grid>
        <Grid item xs={8}> {/* 오른쪽 워드 클라우드 란 */}
          <Item>
            <TabPanel />
          </Item>
        </Grid>
      </Grid>
    </Container>

  );
}
                 /* 컴포넌트를 외부로 내보내기(exports)위해 사용. 다른 파일에서 이 컴포넌트를 불러와 사용 */