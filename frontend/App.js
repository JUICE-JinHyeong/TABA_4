import React, { useState, useEffect }  from 'react';                             /* useState는 검색창 체크리스트 위함. useState 훅을 사용해 목록요소의 상태를 관리, 버튼 클릭시 목록요소의 클래스를 변경해 보여주기가능. */
      /* useEffect: 앞▼에 기본값 "식당 검색"= 컴포넌트가 처음으로 렌더링될 때 "식당 검색"이 선택되도록 설정 */
import './App.css';
import searchImage from './search.png';                               /*돋보기 이미지*/
import keyboardImage from './keyboard_icon.png';                      /*키보드 이미지*/
import lowImage from './▼.png';                                       /*▼ 이미지*/

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [showList, setShowList] = useState(false);                                      /*검색창 체크리스트*/
  const [selectedOption, setSelectedOption] = useState('');                             /* // */
  const handleClick = () => { setShowList(!showList);};                                 /* // */
  const handleCheckboxChange = (event) => {setSelectedOption(event.target.value);};     /* // */
  useEffect(() => {setSelectedOption('식당 검색'); }, []);                               /*앞▼에 기본값 "식당 검색"*/

  return (
    <main className="container">
      <h1 className="title">Na</h1>
      <h2 className="subtitle1">의 솔직</h2>
      <h2 className="subtitle2">RE</h2>
      <h2 className="subtitle3">view</h2>

      <div className="search-input-wrapper">                                                    {/*검색바,버튼 래핑*/}
        <input type="text" className="search-input" placeholder="음식점 이름 또는 메뉴명 입력" /> {/*검색바*/}
        <button className="search-input-button" onClick={handleClick}>                          {/*앞▼ 버튼*/}
          <img src={lowImage} alt="low" className="low-icon_2" />                               {/* // */}
        </button>                                                                               {/* // */}
        <button className="keyboard-button">                                                    {/*키보드 버튼*/}
        <img src={keyboardImage} alt="keyboard" className="keyboard-icon" />                    {/* // */}
      </button>                                                                                 {/* // */}
      <button className="low-button">                                                           {/*▼ 버튼*/}
        <img src={lowImage} alt="low" className="low-icon" />                                   {/* // */}
      </button>                                                                                 {/* // */}
      <button className="search-button">                                                        {/*돋보기 버튼*/}
        <img src={searchImage} alt="Search" className="search-icon" />                          {/* // */}
      </button>                                                                                 {/* // */}
      {selectedOption && !showList && (                                                          /*앞▼ 기본값(식당검색) 표시=이 조건이 참일 때에만 선택한 항목이 출력*/
          <div className="selected-option">{selectedOption}</div>)}                             {/* // */}
      </div> 

      <ul className={`list ${showList ? 'show' : ''}`}>
        <li>
          <label>
            <input
              type="checkbox"                               
              name="options"        /*검색창에 1개만 체크하기위해: name 속성을 동일하게 지정, 각 체크박스에 대해 onChange 이벤트를 처리해 선택상태를 관리*/
              value="식당 검색"
              checked={selectedOption === '식당 검색'}          /*selectedOption 상태는 선택된 옵션을 저장, checked 속성: 선택 옵션과 비교해 상태 설정*/
              onChange={handleCheckboxChange}              /*handleCheckboxChange 함수는 체크박스의 onChange 이벤트를 처리하여 선택된 옵션을 업데이트*/
            />
            식당 검색
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="options"        /*검색창에 1개만 체크하기위해: name 속성을 동일하게 지정, 각 체크박스에 대해 onChange 이벤트를 처리해 선택상태를 관리*/
              value="음식 검색"
              checked={selectedOption === '음식 검색'}          /*selectedOption 상태는 선택된 옵션을 저장, checked 속성: 선택 옵션과 비교해 상태 설정*/
              onChange={handleCheckboxChange}              /*handleCheckboxChange 함수는 체크박스의 onChange 이벤트를 처리하여 선택된 옵션을 업데이트*/
            />
            음식 검색
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="options"        /*검색창에 1개만 체크하기위해: name 속성을 동일하게 지정, 각 체크박스에 대해 onChange 이벤트를 처리해 선택상태를 관리*/
              value="지역 검색"
              checked={selectedOption === '지역 검색'}          /*selectedOption 상태는 선택된 옵션을 저장, checked 속성: 선택 옵션과 비교해 상태 설정*/
              onChange={handleCheckboxChange}              /*handleCheckboxChange 함수는 체크박스의 onChange 이벤트를 처리하여 선택된 옵션을 업데이트*/
            />
            지역 검색
          </label>
        </li>
      </ul>
      {showList && (<div className="selected-option">{selectedOption}</div>)}    {/*리스트 선택한 항목을 보여줌 = 선택항목은 selectedOption 상태에 저장, 체크박스를 클릭할 때마다 handleCheckboxChange 함수 호출돼 선택항목을 업데이트 */}
    </main>
  );
}

export default App;                   /* 컴포넌트를 외부로 내보내기(exports)위해 사용. 다른 파일에서 이 컴포넌트를 불러와 사용 */