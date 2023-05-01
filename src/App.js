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
  styled,
} from '@mui/material';

const theme = createTheme();

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/getSeasonList')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.seasonNumber}>
                <TableCell>{row.seasonNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Root>
  );
}

export default HomePage;
