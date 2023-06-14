import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BasicTable({ data }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!data) {
    return null; // 또는 로딩 상태 등을 표시하는 대체 화면을 반환
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: '100%' }} aria-label="simple table">
        <TableBody>

          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell >상세주소: {data.address}</TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">전화번호: {data.pn}</TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell> 영업시간: {data.opentime}</TableCell>
          </TableRow>

          {data.description && (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                상세정보: 
                {data.description.length > 100 && !expanded ? data.description.substring(0, 100) + "..." : data.description}
                {data.description.length > 100 && (
                  <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                )}
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                </Collapse>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
