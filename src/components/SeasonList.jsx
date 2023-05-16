import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled } from '@mui/material';
import {  withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import EpisodeList from './EpisodeList'
import '../css/600.css';

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "white",
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#A2B4CD",
  },
  '&:hover': {
    backgroundColor: '#ABC2E5',
    cursor: 'pointer'
  },
}));


const formatDate = (date) => {
  return format(new Date(date), 'MM/dd/yyyy');
}

function SeasonList() {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);  
  const [isEpisodeListVisible, setIsEpisodeListVisible] = useState(false);

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
            //if(responseData.seasonNumber != null )
              responseData.seasonNumber = rowData.seasonNumber;            
            setSelectedRowData(responseData); 
            setIsEpisodeListVisible(!isEpisodeListVisible);
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
              <React.Fragment key={row.seasonNumber}>
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
                  <TableCell>{`${formatDate(row.airDateStart)}`} - {`${formatDate(row.airDateEnd)}`}</TableCell>
                  <TableCell>{row.seasonType}</TableCell>
                </StyledTableRow>                              
                {selectedRowData.seasonNumber === row.seasonNumber &&                  
                  <StyledTableRow>
                    <TableCell colSpan={3}>
                      <EpisodeList seasonNumber={row.seasonNumber}/>
                    </TableCell>
                  </StyledTableRow>
                }
              </React.Fragment>              
            ))}            
          </TableBody>
        </StyledTable>
      </TableContainer>                  
    </div>
    
  );
}

export default SeasonList;
