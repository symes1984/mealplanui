import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Menu600 = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);

    // Redirect to the appropriate page based on the selected value
    switch (selectedValue) {
      case 10:
        navigate('/add-modify-season');
        break;
      case 20:
        navigate('/add-modify-episode');
        break;
      case 30:
        navigate('/add-modify-patient');
        break;
      case 40:
        navigate('/add-modify-meal');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">
          <MenuIcon style={{ marginRight: '10px' }} />
          Choose an option
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          <MenuItem value={10}>Add/Modify Season</MenuItem>
          <MenuItem value={20}>Add/Modify Episode</MenuItem>
          <MenuItem value={30}>Add/Modify Patient</MenuItem>
          <MenuItem value={40}>Add/Modify Meal</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Menu600;
