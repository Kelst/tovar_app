import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useStore from '../store/store';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Allert() {
  const alertOpen=useStore(state=>state.alertOpen)
  const alertText=useStore(state=>state.alertText)
  const setAlertOpen=useStore(state=>state.setAlertOpen)

  

 

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={()=>setAlertOpen(false)}>
        <Alert onClose={()=>setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
          {alertText}
        </Alert>
      </Snackbar>
    </Stack>
  );
}