import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

import axios from 'axios';

const AddModifySeason = () => {
  const [searchParams] = useSearchParams();
  const [seasonNumber, setSeasonNumber] = useState('');
  const [airDateStart, setStartDate] = useState(null);
  const [airDateEnd, setEndDate] = useState(null);
  const [seasonType, setSeasonType] = useState('My600lbLife');  

  useEffect(() => {
    const params = {
      seasonNumber: searchParams.get('seasonNumber'),
      airDateStart: searchParams.get('airDateStart'),
      airDateEnd: searchParams.get('airDateEnd'),
      seasonType: searchParams.get('seasonType'),
    };

    setSeasonNumber(params.seasonNumber || '');
    setStartDate(params.airDateStart ? new dayjs(params.airDateStart) : null);
    setEndDate(params.airDateEnd ? new dayjs(params.airDateEnd) : null);
    setSeasonType(params.seasonType || 'My600lbLife');
  }, [searchParams]);

  const handleSeasonNumberChange = (event) => {
    setSeasonNumber(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSeasonTypeChange = (event) => {
    setSeasonType(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Season Number: " + seasonNumber + ", airDateStart: " + airDateStart + ", airDateEnd: " + airDateEnd + ", seasonType: " + seasonType);
    axios.post('http://localhost:8080/saveSeason', {
      seasonNumber,
      airDateStart,
      airDateEnd,
      seasonType
    })
    .then((response) => {
      // Handle successful response
      navigate('/success');
    })
    .catch((error) => {
      // Handle error
    });
  };
  
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: "16px"}}>
      <h1>Add or Modify Season</h1>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="season-number"            
            value={seasonNumber}
            onChange={handleSeasonNumberChange}
            label="Season Number"
            style={{ marginRight: "8px"}}
          />
          <Select
            id="season-type"
            label="Season Type"
            value={seasonType}
            onChange={handleSeasonTypeChange}
            style={{ width:"200px", marginRight: "8px" }}
          >
            <MenuItem value="My600lbLife">My 600lb Life</MenuItem>
            <MenuItem value="My600lbLife-WATN">Where Are They Now</MenuItem>
          </Select>        
          <LocalizationProvider dateAdapter={AdapterDayjs}>            
              <DatePicker
                label="Air Start Date"
                value={airDateStart}
                onChange={handleStartDateChange}
                textField={(params) => <TextField {...params} />}
                sx={{ marginRight: 1}}                
              />
              <DatePicker
                label="Air End Date"
                value={airDateEnd}
                onChange={handleEndDateChange}
                textField={(params) => <TextField {...params} />}               
              />
          </LocalizationProvider>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px"}}>
            <Button variant="contained" onClick={handleCancel} style={{ marginRight: "4px"}}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" style={{ marginLeft: "4px"}}>
              Submit
            </Button>
          </div>        
      </form>
      </div>
    </div>
  );
};

export default AddModifySeason;
