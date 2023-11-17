import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
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
  width:900,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  height:"90vh",
  overflow: 'auto',
  '@media (max-width: 1000px)': {
    width: '70%',
  },

  boxShadow: 24,
  p: 4,
};


export default function ModalAdd({id_cat,open,setOpen,setGoods}) {
  
  const [name, setName] = React.useState("");
  const [cost, setCost] = React.useState(0);
  const [unique, setUnique] = React.useState(1);
  const [state, setState] = React.useState(1);
  const [text, setText] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);

  const [url, setUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [uniquePrice, setUniquePrice] = React.useState(0);

  const setLoader=useStore(state=>state.setLoader)
  const loader=useStore(state=>state.loader)
  const addGood=useStore(state=>state.addGood)

  const setAlertText=useStore(state=>state.setAlertText)
  const setAlertOpen=useStore(state=>state.setAlertOpen)

  function areFieldsNotEmpty() {
    if (
      name?.trim() === "" ||
      text?.trim() === "" ||
      title?.trim() === ""

    ) {
      return false; 
    }
    return true; 
  }
// const editedTransport=useStore(state=>state.editedTransport)
// const getAllCategory=useStore(state=>state.getAllCategory)
const handlePasteFromClipboard=async(e)=>{
  e.preventDefault(); 
  await  navigator.permissions.query({ name: 'clipboard-read' })
  async function getClipboardContents() {
    try {
      const clipboardItems = await navigator.clipboard.read();
  
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          const blob = await clipboardItem.getType(type);
          if(type.includes("image"))
       {   console.log(blob);
          const formData = new FormData();
          formData.append('file', blob);
          setLoader(true)
        let  resp=await axios.post('https://shop-intelekt.pp.ua/api/storage', formData, {
        
headers: {
  'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
},
}) 
setUrl(resp.data);
setLoader(false)
setAlertText("Зображення завантажено")
setAlertOpen(true)
console.log(resp.data);
}

        }
      }
    } catch (err) {
      console.error(err.name, err.message);
    }
  }
await getClipboardContents()
  // navigator.permissions.query({name:"clipboard"})


 }
const handleClose = () => {
  
  setOpen(false)};
const handleFileChange =async (e) => {
    
  let resp
  const selectedFile = e.target.files[0];
  const formData = new FormData();
  formData.append('file', selectedFile);

  try{
  setLoader(true)
 
  resp=await axios.post('http://194.8.147.150:4001/api/storage', formData, {
   
headers: {
  'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
},
})

setUrl(resp.data)
setLoader(false)
setAlertText("Зображення завантажено")
setAlertOpen(true)


}
catch(e){
  console.log(e);
setAlertText("Помилка при завантаженні зображення")
setAlertOpen(true)
}
finally {

setLoader(false)


if(resp.data){

  setAlertText("Зображення завантажено")
  setAlertOpen(true)  
 

}else {

  setAlertText("Зображення не завантажено")
  setAlertOpen(true)
   
}

}
};
const handleSave= async()=>{
console.log("SAVE");
const edited={
  id_cat:id_cat,
  name:name,
  cost:cost,
  text:text,
  quantity:quantity,
  url:url,
  title:title,
  state:state,
  unique:unique,
  uniquePrice:uniquePrice,
}
const data= await addGood(edited)
setGoods(prev => {
  return [...prev,data]
});
setName("")
setCost("")
setUnique(1)
setState(1)
setText("")
setQuantity(0)
setUrl("")
setTitle("")
setUniquePrice(0)

setOpen(false);
}
  function checkFilds() {
    if (address != "" || notification != "" || login != "") {
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
                id="name"
                label="Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
                <TextField
                id="cost"
                label="Ціна"
                type="number"
                value={cost}
                onChange={(event) => {
                  setCost(event.target.value);
                }}
              /> 
              <TextField
               
               id="title"
               label="Характеристики товару"
               value={title}
               multiline
               maxRows={3}
               onChange={(event) => {
                
                const inputText = event.target.value;

if (inputText.length <= 300) {
  setTitle(inputText);
}
              }}
             />
              <TextField
               
               id="text"
               label="text"
               value={text}
               multiline
               maxRows={6}
               onChange={(event) => {
                
                 const inputText = event.target.value;

 if (inputText.length <= 2000) {
   setText(inputText);
 }
               }}
             />
                  <TextField
                id="quantity"
                label="Кількість"
                type="number"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
              /> 
               <label htmlFor="upload-photo" className=" flex  flex-col">
               <div className="flex gap-5 mb-2 relative z-50  items-center">
                  <div className=" w-[500px] overflow-hidden"> <span>Url зображення: {url}  </span> </div>
                   <div className=" cursor-pointer" onClick={handlePasteFromClipboard} > <ContentPasteIcon  /> Вставити зображення з буферу</div>
                </div>
  <input
    style={{ display: 'none' }}
    id="upload-photo"
    name="upload-photo"
    type="file"
    onChange={handleFileChange}
  />


   <LoadingButton  component="span" loading={loader} variant="contained">
   Завантажити фото

      </LoadingButton> 
</label>

              <TextField
                id="unique_price"
                label="Ціна тижня"
                value={uniquePrice}
                type="number"
                onChange={(event) => {
                  setUniquePrice(event.target.value);
                }}
              />
            
              {areFieldsNotEmpty() ? (
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
