import axios from 'axios';
import './App.css';
import React, { useState, useEffect }  from 'react';
import searchImage from './images/search.png';
import keyboardImage from './images/keyboard_icon.png'; 
import lowImage from './images/▼.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import Checkbox from './Component/Checkbox'; // Checkbox component

function Main() {
  const [showList, setShowList] = useState(false); 
  const [selectedOption, setSelectedOption] = useState('');
  const handleClick = () => { setShowList(!showList);};
  const handleCheckboxChange = (event) => {setSelectedOption(event.target.value);};
  useEffect(() => {setSelectedOption('식당 검색'); }, []); 

  const [showSearchPage, setShowSearchPage] = useState(false); 
  const searchOptions = ['식당 검색', '음식 검색', '지역 검색']; // Options for search
  
  return (
    <main className="container">
      {!showSearchPage && (
        <>
          <h1 className="title">Na</h1>
          <h2 className="subtitle1">의 솔직</h2>
          <h2 className="subtitle2">RE</h2>
          <h2 className="subtitle3">view</h2>

          <div className="search-input-wrapper"> 
            <input type="text" className="search-input" placeholder="음식점 이름 또는 메뉴명 입력" />
            <button className="search-input-button" onClick={handleClick}>
              <img src={lowImage} alt="low" className="low-icon_2" />
            </button> 
            <button className="keyboard-button">
              <img src={keyboardImage} alt="keyboard" className="keyboard-icon" />
            </button> 
            <button className="low-button">
              <img src={lowImage} alt="low" className="low-icon" /> 
            </button>
            <button className="search-button" onClick={() => {setShowSearchPage(true);}}>
              <img src={searchImage} alt="Search" className="search-icon" /> 
            </button> {/*검색 버튼*/}
            {selectedOption && !showList && (
              <div className="selected-option">{selectedOption}</div>
            )}
          </div> 

          <ul className={`list ${showList ? 'show' : ''}`}>
            {searchOptions.map(option => (
              <Checkbox 
                key={option}
                option={option}
                selectedOption={selectedOption}
                onChange={handleCheckboxChange}
              /> /* 체크박스 컴포넌트로 체크박스 구현 */
            ))}
          </ul>
          {showList && <div className="selected-option">{selectedOption}</div>}
        </>
      )}

      {showSearchPage && <SearchPage />}
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/searchPage" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;