import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import useStore from '../store/store';

export default function Loader() {
 

const loader=useStore(state=>state.loader)

return (
    <div>
    
      <Backdrop
        sx={{ zIndex:1000, color: '#fff'}}
        open={loader}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}