import React from 'react';
import { 
  Typography,
  styled
} from '@mui/material';
import SeasonList from './components/SeasonList';
import Header from './components/Header';

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5'
}));

function HomePage() {
  return (    
    <Root>           
      <Typography variant="h4" gutterBottom style={{ display: 'flex', alignItems: 'center' }}>      
        <Header/>
      </Typography>         
      <SeasonList/>           
    </Root>
  );
}

export default HomePage;
