import React, { useEffect } from "react";

const Tab_Map = ({ address }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=dca6f081e8c58bcdcf54a31f0ca0698d&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };

        const map = new window.kakao.maps.Map(container, options);

        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(address, function (result, status) {
          // 정상적으로 검색이 완료됐으면 
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords
            });

            // 마커에 클릭 이벤트를 등록합니다
            window.kakao.maps.event.addListener(marker, 'click', function() {
              // 마커 클릭시 인포윈도우에 표출될 내용입니다
              const iwContent = '<div style="padding:5px;">' + address + '</div>';
              
              // 인포윈도우를 생성합니다
              const infowindow = new window.kakao.maps.InfoWindow({
                  content : iwContent
              });

              // 인포윈도우를 마커위에 표시합니다
              infowindow.open(map, marker);  
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });
      });
    };
  }, [address]);  // address가 변경될 때마다 지도를 다시 로드합니다

  return <div id="map" style={{ width: "700px", height: "500px" }}></div>;
};

export default Tab_Map;
