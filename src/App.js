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
      <Menu600/><div style={{marginLeft: "10px"}}>How y'all Doing</div>
      </Typography>         
      <SeasonList/>                
    </Root>
  );
}

export default HomePage;
