import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import useStore from '../store/store';



export default function DialogAlert({textAlert,handlefunction,setOpen,open}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const setLoader=useStore(state=>state.setLoader)
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete= async()=>{
    setLoader(true)
   await handlefunction()
    setLoader(false)
    setOpen(false);

  }
return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
      
        <DialogContent>
          <DialogContentText>
           {textAlert}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDelete}>
            Видалити
          </Button>
          <Button onClick={handleClose} autoFocus>
            Скасувати
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}