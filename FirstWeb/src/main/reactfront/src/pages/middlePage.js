import React from 'react';
import { Container, Grid, Box, Paper } from '@mui/material';
import SearchBar from '../Component/SearchBar';
import Card from '../Component/Card';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MiddlePage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchOption = queryParams.get('searchOption');
    const searchInput = queryParams.get('searchInput');
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
                <Grid container spacing={3}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Grid item xs={4} key={item}>
                            <Card />
                        </Grid>
                    ))}
                </Grid>

            </Grid>

        </Container>

    );

}
/*Card의 객체화 관련 주석
지금 저 카드에 담긴 내용은 똑같잖아, 근데 내 계획은 SearchBar컴포넌트에서 select와 텍스트를 입력받아 DB에서 해당 관련된 내용을 저런 카드 형식으로 보여주는 거야 그러러면 어떻게 해야해?
DB에서 데이터를 가져와서 각각의 카드에 다른 내용을 보여주려면 주로 다음과 같은 단계를 따릅니다:

1. 데이터 가져오기: 데이터를 가져오려면 대게 API 호출을 사용합니다. 이 API 호출은 React에서 `fetch()` 함수, `axios` 라이브러리 등을 사용해 구현할 수 있습니다. API 호출은 대개 React의 `useEffect` 훅 내에서 실행하며, 가져온 데이터는 컴포넌트의 state에 저장합니다.

2. 데이터를 카드에 적용하기: 가져온 데이터는 배열 형태일 것입니다. 이 배열을 `.map()` 메서드를 사용해 각각의 카드 컴포넌트에 적용할 수 있습니다.

아래는 데이터를 API에서 가져와서 각 카드에 적용하는 방법을 보여주는 간략한 예시입니다.

```jsx
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import RecipeReviewCard from './RecipeReviewCard';

function MyGrid() {
  const [data, setData] = useState([]); // 데이터를 저장할 state

  useEffect(() => {
    fetch('YOUR_API_URL') // 여기에는 실제 API URL을 입력합니다.
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Grid container spacing={3}>
      {data.map((item) => (
        <Grid item xs={4} key={item.id}> // 각 아이템은 고유한 ID를 가져야 합니다.
          <RecipeReviewCard data={item} /> // 각 아이템의 데이터를 카드에 전달합니다.
        </Grid>
      ))}
    </Grid>
  );
}

export default MyGrid;
```

이제 `RecipeReviewCard` 컴포넌트가 `props`를 통해 데이터를 받을 수 있게 수정해야 합니다. 예를 들어, `props.data.title`을 사용하여 각 카드의 제목을 설정할 수 있습니다.

참고로, 이 코드는 간략한 예시로, 실제 코드에서는 오류 처리, 로딩 상태 표시 등의 추가 로직이 필요할 수 있습니다. 또한 API URL, 데이터의 형태 등은 실제 애플리케이션의 상황에 따라 달라집니다.
*/
