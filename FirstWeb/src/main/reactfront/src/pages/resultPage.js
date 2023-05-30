import TabPanel from '../Component/TabPanel';
import { Container, Grid, Box, Paper } from '@mui/material';
import * as React from 'react';
import { styled, makeStyles } from '@mui/material/styles';
import SearchBar from '../Component/SearchBar';
import Image from '../Component/Image';
import Table from '../Component/Table';
import { useNavigate } from 'react-router-dom';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function ResultPage() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <Container style={{ height: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs="2"> {/* 왼쪽 로고란 */}
          <Box display="flex" alignItems="center" height="100%">
            <h1 onClick={handleLogoClick}>나리뷰</h1>
          </Box>
        </Grid>
        <Grid item xs="10"> {/* 검색창 */}
          <Box display="flex" alignItems="center" height="100%">
            <SearchBar />
          </Box>
        </Grid>
        <Grid item xs="4"> {/* 왼쪽 검색결과란 */}
          <Image />
          <Table></Table>
        </Grid>
        <Grid item xs="8"> {/* 오른쪽 워드 클라우드 란 */}
          <Item>
            <TabPanel />
          </Item>
        </Grid>
      </Grid>
    </Container>

  );
}
                 /* 컴포넌트를 외부로 내보내기(exports)위해 사용. 다른 파일에서 이 컴포넌트를 불러와 사용 */