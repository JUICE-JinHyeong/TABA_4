import React, { useState } from 'react';
import { Select, MenuItem, TextField, InputLabel, FormControl, Box, IconButton, Alert, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const options = ['식당', '음식'];

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const handleSearch = () => {
        if (selectedOption && searchInput) {
            if (showAlert) {
                setShowAlert(false);
            }
            console.log(selectedOption)
            console.log(searchInput)

            navigate(`/middlePage?selectedOption=${selectedOption}&searchInput=${searchInput}`);
        } else {
            setShowAlert(true);
        }
    };


    return (
        <Box display="flex" alignItems="center" gap={2}>
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
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
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        handleSearch();
                        event.preventDefault();  // prevent the default action (form submission)
                    }
                }}
                placeholder="Search here..."
                sx={{ minWidth: 600 }}
            />
            <IconButton onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
            <Modal // 옵션과 내용을 입력하지 않으면 경고 발생
                open={showAlert}
                onClose={() => setShowAlert(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Alert severity="warning">
                        선택된 옵션과 입력값을 확인하세요.
                    </Alert>
                </Box>
            </Modal>
        </Box>
    );
};

export default SearchBar;

/*import React, { useState } from 'react';
import { Select, MenuItem, TextField, InputLabel, FormControl, Box, IconButton, Alert, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const options = ['식당', '지역', '음식'];

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearch = () => {
    if (selectedOption && searchInput) {
      if (showAlert) {
        setShowAlert(false);
      }
      navigate(`/middlePage?searchOption=${selectedOption}&searchInput=${searchInput}`);
    } else {
      setShowAlert(true);
    }
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
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
  value={searchInput}
  onChange={handleInputChange}
  onKeyPress={(event) => {
    if (event.key === 'Enter') {
      handleSearch();
      event.preventDefault();  // prevent the default action (form submission)
    }
  }}
  placeholder="Search here..."
  sx={{ minWidth: 600 }}
/>
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      <Modal
        open={showAlert}
        onClose={() => setShowAlert(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}>
          <Alert severity="warning">
            선택된 옵션과 입력값을 확인하세요.
          </Alert>
        </Box>
      </Modal>
    </Box>
  );
};

export default SearchBar;*/
