import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TextField,Button} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';

const AddModifyEpisode = () => {
    const [searchParams] = useSearchParams();
    const [episodeNumber, setEpisodeNumber] = useState('');
    const [episodeName, setEpisodeName] = useState('');
    const [airDate, setAirDate] = useState(null);    

    useEffect(() => {
        const params = {
          episodeNumber: searchParams.get('episodeNumber'),
          episodeName: searchParams.get('episodeName'),
          airDate: searchParams.get('airDate')
        };    
    
        setEpisodeNumber(params.episodeNumber || '');        
        setEpisodeName(params.episodeName || '');
        setAirDate(params.airDate ? new dayjs(params.airDate) : null);        
      }, [searchParams]);    

    const handleSubmit = (event) => {
        event.preventDefault();    
        axios.post('http://localhost:8080/saveEpisode', {
          episodeNumber,
          episodeName,
          airDate
        })
        .then((response) => {
          // Handle successful response
          navigate('/success');
        })
        .catch((error) => {
          // Handle error
        });
      };

    const handleEpisodeNumberChange = (event) => {
        setEpisodeNumber(event.target.value);
    };      

    const handleEpisodeNameChange = (event) => {
        setEpisodeName(event.target.value);
    };          

    const handleAirDateChange = (event) => {
        setAirDate(event.target.value);
    };         

    const navigate = useNavigate();    

    const handleCancel = () => {
        navigate(-1);
    };      

    return (
        <div style={{ padding: "16px"}}>
            <h1>Add or Modify Episode</h1>        
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <form onSubmit={handleSubmit}>
                <TextField
                    id="episode-number"            
                    value={episodeNumber}
                    onChange={handleEpisodeNumberChange}
                    label="Episode Number"
                    style={{ marginRight: "8px"}}
                />
                <TextField
                    id="episode-name"            
                    value={episodeName}
                    onChange={handleEpisodeNameChange}
                    label="Episode Name"
                    style={{ marginRight: "8px"}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>            
                    <DatePicker
                        label="Air Date"
                        value={airDate}
                        onChange={handleAirDateChange}
                        textField={(params) => <TextField {...params} />}
                        sx={{ marginRight: 1}}                
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

export default AddModifyEpisode;