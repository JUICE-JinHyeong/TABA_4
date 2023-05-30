import React, { useState } from 'react';
import { Select, MenuItem, TextField, InputLabel, FormControl, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

  const options = ['식당', '지역', '음식']; 

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearch = () => {
    console.log(`Performing search on ${selectedOption} for ${searchInput}`);
    navigate(`/middlePage?searchOption=${selectedOption}&searchInput=${searchInput}`);

    // 여기에서 검색 로직을 실행하거나 API를 호출하면 됩니다.
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <FormControl variant="outlined" sx={{ minWidth: 300 }}>
        <InputLabel id="search-option-label">Search Option</InputLabel>
        <Select
          labelId="search-option-label"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Search here..."
        sx={{ minWidth: 600 }}
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;


// import React, { useState, useEffect} from 'react';
// import searchImage from '../images/search.png';                               /* 돋보기 이미지 */
// import keyboardImage from '../images/keyboard_icon.png';                      /* 키보드 이미지 */
// import lowImage from '../images/low.png';   
// import Choice from './Choice';

// function SearchBar() {
//   const [showList, setShowList] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [showSearchPage, setShowSearchPage] = useState(false);  // 검색 페이지 표시 여부 관리
//   useEffect(() => { setSelectedOption('식당 검색'); }, []);

//   const handleSearchButtonClick = () => {
//     // TODO: implement the function
//   };

//   const handleClick = () => {
//     setShowList(!showList);
//   };

//   const handleCheckboxChange = (e) => {
//     setSelectedOption(e.target.value);
//   };
  

//   return (
//     <div className="search-input-wrapper">
//       <input type="text" className="search-input" placeholder="음식점 이름 또는 메뉴명 입력" />
//       <button className="search-input-button" onClick={handleClick}>
//         <img src={lowImage} alt="low" className="low-icon_2" />
//       </button>
//       <button className="keyboard-button">
//         <img src={keyboardImage} alt="keyboard" className="keyboard-icon" />
//       </button>
//       <button className="low-button">
//         <img src={lowImage} alt="low" className="low-icon" />
//       </button>
//       <button className="search-button" onClick={handleSearchButtonClick}>
//         <img src={searchImage} alt="Search" className="search-icon" />
//       </button>

//       {selectedOption && !showList && (
//         <div className="selected-option">{selectedOption}</div>
//       )}

//       <ul className={`list ${showList ? 'show' : ''}`}>
//         {['식당 검색', '음식 검색', '지역 검색'].map(option => (
//           <li key={option}>
//             <label>
//               <input
//                 type="checkbox"
//                 name="options"
//                 value={option}
//                 checked={selectedOption === option}
//                 onChange={handleCheckboxChange}
//               />
//               {option}
//             </label>
//           </li>
//         ))}
//       </ul>

//       {showList && (<div className="selected-option">{selectedOption}</div>)}
//     </div>
//   );
// }

// export default SearchBar;
