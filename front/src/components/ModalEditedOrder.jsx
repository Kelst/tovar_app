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
import ContentPasteIcon from '@mui/icons-material/ContentPaste';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Ширина змінена на відсотки
  height:"90%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};


export default function ModalEditedOrder({ order,open,setOpen,setOrder,setUpdateDate}) {
  
  const [name, setName] = React.useState("");
  const [novaPoshta, setnovaPoshta] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [telegram_id, setTelegram_id] = React.useState("");
  const [cart_json,setCart_json]=React.useState("");
  const [address, setAddress] = React.useState("");
  const [sum, setSum] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [status, setStatus] = React.useState(0);

  const setLoader=useStore(state=>state.setLoader)
  const loader=useStore(state=>state.loader)
  const updateRowsOrder=useStore(state=>state.updateRowsOrder)
  const setAlertText=useStore(state=>state.setAlertText)
  const setAlertOpen=useStore(state=>state.setAlertOpen)
 
  function areFieldsNotEmpty() {
    if (
      name == "" ||
      phone === "" ||
      address === "" ||
      sum === "" ||
      status === ""
    ) {
      return false;
    }
    return true;
  }

 
const handleClose = () => setOpen(false);

const handleSave= async()=>{
try {
  

const edited={
  ...order,
  name:name,
  novaPoshta:novaPoshta,
  telegram_id:telegram_id,
  cart_json: cart_json,
  address:address,
  sum:sum,
  comment:comment,
  status:status

   
}
await updateRowsOrder(edited)
setUpdateDate()

setOpen(false);
} catch (error) {
  setOpen(false);
  setUpdateDate()
}
}
 
  useEffect(()=>{
    console.log(order,"RRRRRRRRRRRRR");
    console.log("TESSSSSSSSTTTTTTTTT");
    setName(order.name)
    setnovaPoshta(order.nova_poshta)
    setPhone(order.phone)
    setTelegram_id(order.telegram_id)
    setCart_json(order.cart_json)
    setAddress(order.address)
    setSum(order.sum)
    setComment(order.comment)
    setStatus(order.status)
    
  },[order])


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
          <Box sx={style}  className=" overflow-scroll rounded-xl">

            <div className="flex flex-col border-none outline-none gap-4">
              <TextField
                id="name"
                label="Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
                <TextField
                id="novaPoshta"
                label="Номер накладної нова пошта"
                value={novaPoshta}
                onChange={(event) => {
                  setnovaPoshta(event.target.value);
                }}
              /> 
              <TextField
                id="phone"
                label="Номер телефону"
                value={phone}
                onChange={(event) => {
                  const inputText = event.target.value;
                  if (inputText.length <= 15) {
                    setPhone(inputText);
                  }
             
                }}
              />
              <TextField
                id="sum"
                label="Сума замовлення"
                value={sum}
                onChange={(event) => {
                  setSum(event.target.value);
                }}
              />
                  <TextField
                id="address"
                label="Адреса"
                value={address}
                multiline
                maxRows={3}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              <TextField
               
                id="Телеграм ID"
                label="telegram_id"
                value={telegram_id}
                
                onChange={(event) => {
                    setTelegram_id(event.target.value);
                }}
              />
                  <TextField
                id="cart_json"
                label="Товари"
                multiline
                value={cart_json}
                onChange={(event) => {
                  setCart_json(event.target.value);
                }}
              /> 
              

              <TextField
                id="comment"
                label="Коментар"
                value={comment}
                multiline 
                maxRows={5}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
            
              {areFieldsNotEmpty() ? (
                <LoadingButton
                  variant="outlined"
                  startIcon={<SaveAsOutlinedIcon />}
                  onClick={handleSave}
                  loading={loader}
                >  
                  Зберегти
                </LoadingButton>
              ) : (
                <Button
                  disabled
                  variant="outlined"
                  startIcon={<SaveAsOutlinedIcon />}
                >
                  Зберегти
                </Button>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
              }
