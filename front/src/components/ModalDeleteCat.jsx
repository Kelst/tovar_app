import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { FilledInput, Input, TextField, TextareaAutosize } from "@mui/material";
import useStore from "../store/store";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "none",
  

  boxShadow: 24,
  p: 4,
};


export default function ModalDeleteCat({open,setOpen}) {

  const [cat, setCat] = React.useState("");


  const deleteCat=useStore(state=>state.deleteCat)
  const catAll=useStore(state=>state.cat)
  useEffect(()=>{

  },[])
  const handleChange = (event) => {
    setCat(event.target.value);
  
  };


  
const handleClose = () => setOpen(false);

const handleSave= async()=>{

const data= await deleteCat(cat)
setCat("")

}
  function checkFilds() {
    if (cat != "") {
      return true;
    } else return false;
  }

  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}

        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
       
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}  className=" rounded-xl">
            
            <div className="flex flex-col border-none outline-none gap-4">
              
            <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Категорія</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={cat}
          label="Категорія товару"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            catAll.map(e=>{
              return <MenuItem value={e.id}>{e.cat}</MenuItem>
            })
          }

        </Select>

      </FormControl>
     
    </div>
              {checkFilds() ? (
                <LoadingButton
                  variant="outlined"
                  startIcon={<DeleteIcon />} 
                  onClick={handleSave}
                
                >  
                 Видалити категорію
                </LoadingButton>
              ) : (
                <Button
                  disabled
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  Видалити категорію
                </Button>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
