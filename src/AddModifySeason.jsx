import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const AddModifySeason = () => {
  const [seasonNumber, setSeasonNumber] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSeasonNumberChange = (event) => {
    setSeasonNumber(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the seasonName value, such as submit it to a server
    // or update a local data store.
    // ...
  };

  return (
    <div style={{ padding: "16px"}}>
      <h1>Add or Modify Season</h1>
      <div style={{ display: "flex", flexDirection: "row"}}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="season-number"
            label="Season Number"
            value={seasonNumber}
            onChange={handleSeasonNumberChange}
            style={{ marginRight: "8px"}}
          />        
          <LocalizationProvider dateAdapter={AdapterDayjs}>            
              <DatePicker
                label="Air Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                textField={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="Air End Date"
                value={endDate}
                onChange={handleEndDateChange}
                textField={(params) => <TextField {...params} />}
              />
          </LocalizationProvider>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px"}}>
            <Button variant="contained" type="cancel" style={{ marginRight: "8px"}}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" style={{ marginLeft: "8px"}}>
              Submit
            </Button>
          </div>        
      </form>
      </div>
    </div>
  );
};

export default AddModifySeason;
