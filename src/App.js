import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  ThemeProvider,
  createTheme,
  styled
} from '@mui/material';
import {
  withStyles
} from '@mui/styles';

const theme = createTheme();

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#d0e1e1'
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  backgroundColor: '#c1d7d7'
}));

const StyledTableRow = withStyles(() => ({
  root: {
    '&:hover': {
      backgroundColor: '#669999',
    },
  },
}))(TableRow);

function HomePage() {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/getSeasonList')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleRowClick(rowData) {
    axios.get(`http://localhost:8080/getEpisodesForSeason?seasonNumber=${rowData.seasonNumber}`)
        .then(response => {
          setSelectedRowData(response.data);
        })
        .catch(error => {
          console.log(error);
        })
  }

  return (
    <Root>
      <Typography variant="h4" gutterBottom>
        How y'all doing
      </Typography>
      <TableContainer component={Paper}>
        <StyledTable aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Season Number</TableCell>
              <TableCell>Air Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.seasonNumber} onClick={() => handleRowClick(row)}>
                <TableCell>{row.seasonNumber}</TableCell>
                <TableCell>{row.airDateStart} - {row.airDateEnd}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
      {selectedRowData.length > 0 &&
        <TableContainer component={Paper}>
          <Table aria-label="sub-table">
            <TableHead>
              <TableRow>
                <TableCell>Episode Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Air Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedRowData.map((row) => (
                <TableRow key={row.episodeNumber}>
                  <TableCell>{row.episodeNumber}</TableCell>
                  <TableCell>{row.episodeName}</TableCell>
                  <TableCell>{row.airDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }      
    </Root>
  );
}

export default HomePage;
