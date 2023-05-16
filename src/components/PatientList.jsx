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

function PatientList(props) {
  const [patientData, setPatientData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);     
  const episodeNumberInput = props;   

  useEffect(() => {    
    console.log("Getting Patient list for Episode: " + episodeNumberInput.episodeNumber);
    if(episodeNumberInput && episodeNumberInput.episodeNumber) {
        axios.get(`http://localhost:8080/getPatientsForEpisode?episodeNumber=${episodeNumberInput.episodeNumber}`)
        .then(response => {
            setPatientData(response.data);
        })
        .catch(error => {
            console.log(error);
        });   
    }
    else {
        setPatientData();
    }
  }, [episodeNumberInput]);

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
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Country</TableCell>
            </StyledTableHeaderRow>
          </StyledTableHeader>
          <TableBody>
            {patientData && patientData.length > 0 ? (
              patientData.map((row) => (
                <StyledTableRow key={row.id} onClick={() => handleRowClick(row)}>
                  <TableCell>
                    <Link 
                      to={{
                        pathname: '/add-modify-patient',
                        search: `?id=${row.id}&firstName=${row.firstName}&lastName=${row.lastName}`                      
                      }}
                    >
                      {row.firstName}&nbsp;{row.lastName}
                    </Link>
                  </TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.city}</TableCell>                
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.country}</TableCell>
                </StyledTableRow>
            ))
            ) : (
              <StyledTableRow>
                <TableCell colSpan={3}>
                  <p>No patients found</p>
                </TableCell>
              </StyledTableRow>
              )
          }
          </TableBody>
        </StyledTable>
      </TableContainer>      
    </div>
  );
}

export default PatientList;
