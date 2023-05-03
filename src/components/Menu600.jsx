import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Menu600 = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
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
