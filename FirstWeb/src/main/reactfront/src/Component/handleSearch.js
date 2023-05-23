import React from 'react';

var handleSearch = async () => {
    try {
      // searchTerm을 서버로 POST 요청을 보냅니다.(보낼 경로 , 데이터)
      const response = await axios.post('http://localhost:8080/api/save', { data: searchTerm });

      // 여기서는 응답을 콘솔에 출력하겠습니다.
      // 실제 앱에서는 이 응답을 사용하여 UI를 업데이트하거나 다른 작업을 수행하게 될 것입니다.
      console.log(response.data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  }

  export default handleSearch;