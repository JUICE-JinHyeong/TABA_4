// Card 컴포넌트의 내용에 대해 심화 검색

import axios from 'axios';
const transformData = (data) => {
    const imageUrlsString = data.IMAGE.slice(1, -1); // Remove the square brackets
    const imageUrls = imageUrlsString.split(', ');
    const firstImageUrl = [imageUrls[0],imageUrls[1],imageUrls[2],imageUrls[3]];
    console.log(firstImageUrl);
    return {
        
        title: data.REST_NAME,
        description: data.EXPLAIN,
        address: data.BOSS_ADDRESS,
        opentime: data.OPEN_HOUR,
        pn: data.NUM,
        imageURL: firstImageUrl,
        id: data.REST_ID,
    };
};

export const searchFromDB = async (searchOption, searchInput) => {
    try {
        if (!searchOption || !searchInput) {
            return []; // searchOption 또는 searchInput이 없는 경우 빈 배열 반환
        }

        const response = await axios.get('http://localhost:8080/search', {
            params: {
                searchOption: searchOption,
                searchInput: searchInput,
            },
        });

        // 데이터 변환
        console.log(response.data); // 응답 데이터 확인
        
        const transformedData = response.data.map(transformDataForCardComponent).filter(Boolean);

        // 상위 30개만 선택
        const top30Data = transformedData.slice(0, 30);
        
        return top30Data;

    } catch (error) {
        console.error('Failed to fetch data from DB:', error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};
