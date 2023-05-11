import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled } from '@mui/material';
import {  withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
}));

const StyledTableHeader = withStyles(() => ({
  root: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontWeight: 'bold',
  },
}))(TableHead);

const StyledTableHeaderRow = withStyles(() => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: '#f5f5f5',
    },
  },
}))(TableRow);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: '#f5f5f5',
    },
    '&:hover': {
      backgroundColor: '#e6e6e6',
      cursor: 'pointer'
    },
  },
}))(TableRow);

function SeasonList() {
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
    if (selectedRowData.seasonNumber !== rowData.seasonNumber) {
      setSelectedRowData([]);
      axios.get(`http://localhost:8080/getEpisodesForSeason?seasonNumber=${rowData.seasonNumber}`)
          .then(response => {
            const responseData = response.data;
            responseData.seasonNumber = rowData.seasonNumber;
            setSelectedRowData(responseData);          
          })
          .catch(error => {
            console.log(error);
          })
      }
      else {
        setSelectedRowData([]);
      }
  }  

  return (
    <div>            
      <TableContainer component={Paper}>
        <StyledTable aria-label="simple table">
          <StyledTableHeader>
            <StyledTableHeaderRow>
              <TableCell>Season Number</TableCell>
              <TableCell>Air Date</TableCell>
              <TableCell>Type</TableCell>
            </StyledTableHeaderRow>
          </StyledTableHeader>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.seasonNumber} onClick={() => handleRowClick(row)}>
                <TableCell>
                  <Link 
                    to={{
                      pathname: '/add-modify-season',
                      search: `?seasonNumber=${row.seasonNumber}&seasonType=${row.seasonType}&airDateStart=${row.airDateStart}&airDateEnd=${row.airDateEnd}`                      
                    }}
                  >
                    {row.seasonNumber}
                  </Link>
                </TableCell>
                <TableCell>{row.airDateStart} - {row.airDateEnd}</TableCell>
                <TableCell>{row.seasonType}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
      {selectedRowData.length > 0 &&
        <TableContainer component={Paper}>
          <StyledTable aria-label="sub-table">
            <StyledTableHeader>
              <StyledTableHeaderRow>
                <TableCell>Episode Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Air Date</TableCell>
              </StyledTableHeaderRow>
            </StyledTableHeader>
            <TableBody>
              {selectedRowData.map((row) => (
                <StyledTableRow key={row.episodeNumber}>
                  <TableCell>{row.episodeNumber}</TableCell>
                  <TableCell>{row.episodeName}</TableCell>
                  <TableCell>{row.airDate}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      }      
    </div>
  );
}

export default SeasonList;
