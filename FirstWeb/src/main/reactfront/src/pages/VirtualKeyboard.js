import React, { useState } from "react";
import { Button, Grid, Dialog, IconButton, DialogTitle, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import './pages.css';
import Draggable from 'react-draggable';  // add this line

const koreanKeys = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'back'],
  ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ', '[', ']'],
  ['ABC', 'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', ';', "'"],
  ['shift', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', ',', '.', '/'],
  ['space'],
];

const englishKeys = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'back'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
  ['한글', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
  ['space'],
];

const shiftKeys = {
    'ㅂ': 'ㅃ',
    'ㅈ': 'ㅉ',
    'ㄱ': 'ㄲ',
    'ㅅ': 'ㅆ',
    'ㅐ': 'ㅒ',
    'ㅔ': 'ㅖ',
    '`': '~',
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')',
    ',': '<',
    '.': '>',
    '/': '?',
    '[': '{',
    ']': '}',
    ';': ':',
    "'": '"',
  };

  const VirtualKeyboard = ({ onKeyPress, userInput, setUserInput }) => {
    const [isShift, setIsShift] = useState(false);
    const [isOpen, setIsOpen] = useState(true); 
    const [isEnglish, setIsEnglish] = useState(false); 
    const [cursorType, setCursorType] = useState('default'); 

  const handleKeyPress = (key) => {
    if (key === "shift") {
      setIsShift(!isShift);
      return;
    }

    if (key === "ABC" || key === "한글") {
      setIsEnglish(!isEnglish);
      return;
    }
    
    if (key === "back") {
      if (userInput) {
        setUserInput(prevUserInput => prevUserInput.slice(0, -1));  // 이 부분 수정
      }
      return;
    }
    
    
    if (isShift && shiftKeys[key]) {
      key = shiftKeys[key];
    }

    if (key === "space") {
      key = " ";
    }
    
    onKeyPress(key);
  };

  const keys = isEnglish ? englishKeys : koreanKeys; // 현재 키보드 배열을 결정

  
  return (
    <Draggable>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth='xs' fullWidth BackdropProps={{ invisible: true }}
    style={{  position: 'absolute', right: -230, bottom: -330, cursor: 'move',  border: '1px solid grey'}} // 수정된 부분
    onMouseEnter={() => setCursorType('move')} // 마우스가 키보드에 진입하면 cursorType을 'move'로 설정
    onMouseLeave={() => setCursorType('default')} // 마우스가 키보드를 벗어나면 cursorType을 'default'로 설정
>
      <DialogTitle>
      <Box display="flex" justifyContent="space-between" alignItems="center">
 .       <IconButton
          edge="end"
          color="inherit"
          onClick={() => setIsOpen(false)}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        </Box>
      </DialogTitle>
      <Grid container spacing={1}>
        {keys.map((row, rowIndex) => (
          <Grid container item key={rowIndex} justifyContent="center">
            {row.map((k) => (
              <Grid item key={k}>
                <Button
                  variant="outlined"
                  onClick={() => handleKeyPress(k)}
                  sx={{
                    padding: '1px',
                    minWidth: '30px',
                    height: '40px',
                  }}
                >
                  {isShift && shiftKeys[k] ? shiftKeys[k] : k}
                </Button>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Dialog>
    </Draggable>
  );
};

export default VirtualKeyboard;
