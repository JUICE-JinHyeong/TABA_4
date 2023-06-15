import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, CircularProgress, Pagination } from '@mui/material';
import SearchBar from '../SearchBar';
import CardComponent from './MIDDLE_Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { REST_INFO } from '../../api/REST_INFO'; // or wherever you put the file
import queryString from 'query-string'; // Query-string 패키지를 이용해서 URL에서 파라미터를 추출합니다.
import './MIDDLE.css';
import { SEARCH_INPUT } from '../../api/SEARCH_INPUT';


const PaginationContainer = styled('div')({ // 페이지네이션 기능
    display: 'flex',
    justifyContent: 'center',
    margin: '30px',
});

export default function MiddlePage() {
    const [cardsData, setCardsData] = useState([]);
    //
    const cardsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };
    //
    const location = useLocation();
    const { selectedOption, searchInput } = queryString.parse(location.search);
    const navigate = useNavigate();
    const handleLogoClick = () => { // 로고 클릭시 홈페이지로 이동
        navigate('/');
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await REST_INFO(selectedOption, searchInput);
            if (data && data.length > 0) {
              setCardsData(data);
              SEARCH_INPUT(searchInput, selectedOption);
            }
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      }, [selectedOption, searchInput]);
      

    const totalCards = cardsData.length;


    const renderCards = () => {
        if (!cardsData || cardsData.length === 0) {
            return (
                <Grid item xs={12}>
                    <div className="no-search-container">
                        <p className="no-search">'<span className="nosearch-input">{searchInput}</span>' 에 대한 검색결과가 없습니다.<br /><br />
                            <ul className="no-search-tips">
                                <li>단어의 철자가 정확한지 확인해 보세요.</li>
                                <li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.</li>
                                <li>검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.</li>
                                <li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>
                                <li>맞춤법 검사기 검색 옵션을 변경해서 다시 검색해 보세요.</li>
                            </ul>
                        </p>
                    </div>
                </Grid >
            );
        }



        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const cardsToRender = cardsData.slice(startIndex, endIndex);

        return cardsToRender.map((cardData, index) => (
            <Grid item xs={4} key={index}>
                <CardComponent data={cardData} />
            </Grid>
        ));
    };

    useEffect(() => {
        // 비동기 작업 등으로 인한 로딩 시간을 시뮬레이션
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const [loading, setLoading] = useState(true);

    // 로딩 중일 때 Circular 플레이스홀더를 보여줌
    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress size={80} />
            </Box>
        );

    }

    return (
        <Container style={{ height: "125vh", marginTop: '46px'  }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Box display="flex" alignItems="center" height="100%">
                        <img  className="cursor logo" src="/logo_2.png" alt="Logo" onClick={handleLogoClick} style={{ width: '100%' }} />

                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Box display="flex" alignItems="center" height="100%">
                        <SearchBar />
                    </Box>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    {renderCards()}
                </Grid>
            </Grid>
            <PaginationContainer>
                <Pagination count={Math.ceil(totalCards / cardsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
            </PaginationContainer>
        </Container>
    );
}