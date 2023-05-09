import React from 'react';
import { 
  Typography,
  styled
} from '@mui/material';
import Menu600 from './components/Menu600';
import SeasonList from './components/SeasonList';

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5'
}));

function HomePage() {
  return (    
    <Root>           
      <Typography variant="h4" gutterBottom style={{ display: 'flex', alignItems: 'center' }}>      
      <Menu600/><h3 style={{ marginBottom: '0.5rem'}}>How y'all Doing</h3>   
      </Typography>         
      <SeasonList/>           
     
    </Root>
  );
}

export default HomePage;
