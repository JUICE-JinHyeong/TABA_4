// // src/api.js
// import axios from 'axios';
// const transformDataForCardComponent = (data) => {
//     const imageUrlsString = data.IMAGE.slice(1, -1); // Remove the square brackets
//     const imageUrls = imageUrlsString.split(', ');
//     // const firstImageUrl = imageUrls[0];
//     // console.log(firstImageUrl);
//     console.log(imageUrls);

//     return {
        
//         title: data.REST_NAME,
//         description: data.EXPLAIN,
//         address: data.BOSS_ADDRESS,
//         opentime: data.OPEN_HOUR,
//         pn: data.NUM,
//         imageURL: imageUrls,
//         id: data.REST_ID,
//     };
// };

// export const searchFromDB = async (searchOption, searchInput) => {
//     try {
//         if (!searchOption || !searchInput) {
//             return []; // searchOption 또는 searchInput이 없는 경우 빈 배열 반환
//         }

//         const response = await axios.get('https://localhost:8080/search', {
//             params: {
//                 searchOption: searchOption,
//                 searchInput: searchInput,
//             },
//         });

//         // 데이터 변환
//         console.log(response.data); // 응답 데이터 확인
        
//         const transformedData = response.data.map(transformDataForCardComponent).filter(Boolean);

//         // 상위 30개만 선택
//         const top30Data = transformedData.slice(0, 30);
        
//         return top30Data;

//     } catch (error) {
//         console.error('Failed to fetch data from DB:', error);
//         return []; // 에러 발생 시 빈 배열 반환
//     }
// };
const transformDataForCardComponent = (data) => {
    const imageUrlsString = data.IMAGE.slice(1, -1); // Remove the square brackets
    const imageUrls = imageUrlsString.split(', ');
    console.log(imageUrls);
  
    return {
      title: data.REST_NAME,
      description: data.EXPLAIN,
      address: data.BOSS_ADDRESS,
      opentime: data.OPEN_HOUR,
      pn: data.NUM,
      imageURL: imageUrls,
      id: data.REST_ID,
    };
  };
  
  export const searchFromDB = async (searchOption, searchInput) => {
    try {
      if (!searchOption || !searchInput) {
        return []; // searchOption 또는 searchInput이 없는 경우 빈 배열 반환
      }
  
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://localhost:8080/search?searchOption=${searchOption}&searchInput=${searchInput}`);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response); // 응답 데이터 확인
            const transformedData = response.map(transformDataForCardComponent).filter(Boolean);
            const top30Data = transformedData.slice(0, 30); // 상위 30개만 선택
            return top30Data;
          } else {
            console.error('요청 실패');
            return []; // 에러 발생 시 빈 배열 반환
          }
        }
      };
      xhr.send();
    } catch (error) {
      console.error('Failed to fetch data from DB:', error);
      return []; // 에러 발생 시 빈 배열 반환
    }
  };
  