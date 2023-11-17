import { Button, Card, CardMedia, TextField } from '@mui/material'
import React, { useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ModalEdited from './ModalEdited';
import DialogAlert from './DialogAlert';
import useStore from '../store/store';
export default function CardItem({good,setGoods}) {
    const [openEdit,setOpenEdit]=useState(false)
    const [openDialog,setOpenDialog]=useState(false)
    const deleteGood=useStore(state=>state.deleteGood)
 // Функція для розекранування HTML-розмітки
 const unescapeHTML = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.innerHTML;
};
    const handleOpenEdited = () => setOpenEdit(true);
    const deleteGoodById=async ()=>{
      
     await   deleteGood (good.id)
     setGoods(prev => {
        return prev.filter(item => item.id !== good.id); // Видалити елементи, де id співпадає з цільовим ID
      });
    } 
  return (
    <Card className="mt-5 p-2 shadow-xl" variant="outlined" key={good.id}>
          <DialogAlert textAlert={'Ви хочете видалити товар ?'} handlefunction={deleteGoodById} setOpen={setOpenDialog} open={openDialog  } />
    {
        <div>
              <ModalEdited good={good} setGoods={setGoods} open={openEdit} setOpen={setOpenEdit}  /> 
       <div className='flex gap-20 flex-col md:flex-row'>
<div className='w-[100%] border p-4 shadow-md  h-76  overflow-y-auto'>
<div className='mb-2 '>
<span className='font-bold'>Назва:</span> {good.name}
</div>
<div className='mb-2'>
<span className='font-bold'>Ціна:</span> {good.cost}
</div>
<div className='mb-2'>
<span className='font-bold'>Короткий опис:</span> {good.title}
</div>
<div className='mb-2'>
<TextField
value={unescapeHTML(good.text)}
multiline={6}
fullWidth

sx={{
 '.Mui-disabled	':{
  bgcolor:'white',
  WebkitTextFillColor: "black",
  color:'black'


  
 }
}}

/>
</div>
<div className='mb-2'>
<span className='font-bold'>Кількість:</span> {good.quantity}
</div>
{/* <div className='mb-2'>
<span className='font-bold'>Title:</span> {good.title}
</div> */}
<div className='mb-2'>
<span className='font-bold'>Ціна тижня:</span> {good.unique_price}
</div>
</div>

        <div className='flex items-center justify-center w-[100%]  '>
       
     <CardMedia
        component="img"
        className=''
        sx={{
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            borderRadius:"7%",
            width:"auto",
            height:"310px"
        }}
        image={`${good.url}`}
        alt="зображення товару"
                   />
        </div>

    
       </div>
       <div className='flex gap-3 mt-5'>
       <Button className=""  onClick={()=>{ setOpenDialog(true)}} variant="outlined" startIcon={<DeleteOutlinedIcon />}>
Delete
</Button>

<Button variant="outlined" onClick={handleOpenEdited} startIcon={<EditIcon />}>
Edit
</Button>
       </div>
       </div>
    }
   </Card> 
  )
}
