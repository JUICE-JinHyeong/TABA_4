import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Data structure changed
const rows = [
  { name: '가게 정보', 'Frozen yoghurt': 159 },
  { name: '전화 번호', 'Frozen yoghurt': 6.0 },
  { name: '영업 시간', 'Frozen yoghurt': 24 },
  { name: '상세 주소', 'Frozen yoghurt': 4.0 },
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>항목</StyledTableCell>
            <StyledTableCell> 내용 </StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row['Frozen yoghurt']}</StyledTableCell>
              <StyledTableCell align="right">{row['Ice cream sandwich']}</StyledTableCell>
              <StyledTableCell align="right">{row.Eclair}</StyledTableCell>
              <StyledTableCell align="right">{row.Cupcake}</StyledTableCell>
              <StyledTableCell align="right">{row.Gingerbread}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
