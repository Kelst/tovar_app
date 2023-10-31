import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { FilledInput, Input, TextField, TextareaAutosize } from "@mui/material";
import useStore from "../store/store";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import AddIcon from '@mui/icons-material/Add';

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


export default function ModalAddCat({open,setOpen}) {

  const [cat, setCat] = React.useState("");
  const [state, setState] = React.useState(1);
  const addCat=useStore(state=>state.addCat)
  const catAll=useStore(state=>state.cat)
  const loader=useStore(state=>state.loader)

  
const handleClose = () => setOpen(false);

const handleSave= async()=>{

const edited={
  cat:cat,
  state:state
}
const data= await addCat(edited)
setOpen(false);
}
  function checkFilds() {
    if (cat != "" || state != "") {
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
              
              <span className="text-xl   text-gray-900  font-mono shadow-sm font-bold text-center">Заповніть всі поля</span>
              <TextField
                id="cat"
                label="Назва категорії"
                value={cat}
                onChange={(event) => {
                  setCat(event.target.value);
                }}
              />
                <TextField
                id="state"
                label="Стан"
                type="number"
                value={state}
                onChange={(event) => {
                  setState(event.target.value);
                }}
              /> 
              {checkFilds() ? (
                <LoadingButton
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleSave}
                  loading={loader}
                >  
                  Додати товар
                </LoadingButton>
              ) : (
                <Button
                  disabled
                  variant="outlined"
                  startIcon={<AddIcon />}
                >
                  Додати товар
                </Button>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
