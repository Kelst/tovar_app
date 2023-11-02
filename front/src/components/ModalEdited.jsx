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
  width: 900,
  bgcolor: "background.paper",
  border: "none",
  

  boxShadow: 24,
  p: 4,
};


export default function ModalEdited({ good,open,setOpen,setGoods}) {
  
  const [name, setName] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [text, setText] = React.useState("");
  
  const [textInfo,setTextInfo]=React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  
  const [uniquePrice, setUniquePrice] = React.useState(0);
  const setLoader=useStore(state=>state.setLoader)
  const loader=useStore(state=>state.loader)
  const updateRows=useStore(state=>state.updateRows)
  const setAlertText=useStore(state=>state.setAlertText)
  const setAlertOpen=useStore(state=>state.setAlertOpen)
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
      console.error(err);
    }
  }
await getClipboardContents()
  // navigator.permissions.query({name:"clipboard"})


 }


  

  function areFieldsNotEmpty() {
    if (
      name.trim() === "" ||
      cost==0 ||
      text.trim() === "" ||
      url.trim() === "" 

    ) {
      return false; // Якщо хоча б одне поле порожнє, повертаємо false
    }
    return true; // Всі поля не є порожніми, повертаємо true
  }
// const editedTransport=useStore(state=>state.editedTransport)
// const getAllCategory=useStore(state=>state.getAllCategory)
 
const handleClose = () => setOpen(false);
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

const edited={
  ...good,
  name:name,
  cost:cost,
  text:text,
  quantity:quantity,
  url:url,
  title:title,

  unique_price:uniquePrice,


   
}
await updateRows(edited)
setGoods(prev => {
  return prev.map(item => {
    if (item.id === edited.id) { 
      return {...edited };
    } else {
      return item;
    }
  });
});

setOpen(false);
}
  function checkFilds() {
    if (address != "" || notification != "" || login != "") {
      return true;
    } else return false;
  }
  useEffect(()=>{
    setCost(good.cost)
    setName(good.name)
    setQuantity(good.quantity)
    setText(good.text)
    setTitle(good.title)
    setUniquePrice(good.unique_price)
    setUrl(good.url)
    
  },[])


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
                   <div className=" cursor-pointer" onClick={handlePasteFromClipboard} > <ContentPasteIcon  /></div>
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
{/* <TextField
                id="title"
                label="Заголовок"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              /> */}
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
