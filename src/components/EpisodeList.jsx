import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled } from '@mui/material';
import {  withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

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

function EpisodeList(props) {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);     
  const seasonNumberInput = props;   

  useEffect(() => {
    console.log("EpisodeList: " + seasonNumberInput.seasonNumber);
    axios.get(`http://localhost:8080/getEpisodesForSeason?seasonNumber=${seasonNumberInput.seasonNumber}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [seasonNumberInput]);

  function handleRowClick(rowData) {        
    if (selectedRowData.seasonNumber !== rowData.seasonNumber) {
      setSelectedRowData([]);
      axios.get(`http://localhost:8080/getEpisodesForSeason?seasonNumber=${rowData.seasonNumber}`)
          .then(response => {
            const responseData = response.data;
            //if(responseData.seasonNumber != null )
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
                <TableCell>Episode Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Air Date</TableCell>
            </StyledTableHeaderRow>
          </StyledTableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((row) => (
                <StyledTableRow key={row.episodeNumber} onClick={() => handleRowClick(row)}>
                  <TableCell>
                    <Link 
                      to={{
                        pathname: '/add-modify-episode',
                        search: `?episodeNumber=${row.episodeNumber}&episodeName=${row.episodeName}&airDate=${row.airDate}`                      
                      }}
                    >
                      {row.episodeNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{row.episodeName}</TableCell>
                  <TableCell>{`${formatDate(row.airDate)}`}</TableCell>                
                </StyledTableRow>
            ))
            ) : (<p>No episodes found</p>)
          }
          </TableBody>
        </StyledTable>
      </TableContainer>      
    </div>
  );
}

export default EpisodeList;
