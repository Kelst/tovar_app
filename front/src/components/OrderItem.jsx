import { Button, Card, CardMedia } from '@mui/material'
import React, { useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ModalEdited from './ModalEdited';
import DialogAlert from './DialogAlert';
import useStore from '../store/store';
import ModalEditedOrder from './ModalEditedOrder';
export default function OrderItem({order,setOrders,setValue}) {
    const [openEdit,setOpenEdit]=useState(false)
    const [openDialog,setOpenDialog]=useState(false)
    const setInProgress=useStore(state=>state.setInProgress)
    const setUpdatePAge=useStore(state=>state.setUpdatePAge)
    const setAlertOpen=useStore(state=>state.setAlertOpen)
  
    const handleInProgress= async ()=>{
        setUpdatePAge()
       
       await  setInProgress(order.id,order.state)
 
        
    }
    const handleOpenEdited = () => setOpenEdit(true);
    // const deleteGoodById=async ()=>{
      
    //  await   deleteGood (good.id)
    //  setGoods(prev => {
    //     return prev.filter(item => item.id !== good.id); // Видалити елементи, де id співпадає з цільовим ID
    //   });
    // } 
  return (
    <div>
        <ModalEditedOrder order={order} setOpen={setOpenEdit} open={openEdit} setOrder={setOrders} />
          <DialogAlert textAlert={'Ви хочете видалити товар ?'}  setOpen={setOpenDialog} open={openDialog  } />
    {
        <div>
              {/* <ModalEdited good={good} setGoods={setGoods} open={openEdit} setOpen={setOpenEdit}  />  */}
   
              <div class="max-w-lg mx-auto bg-white rounded p-6 shadow-md">

<h1 class="text-2xl font-semibold mb-4">Інформація про замовлення</h1>

<div class="mt-6">
    <p class="text-gray-600">Ім'я: <span class="font-semibold">{order.name}</span></p>
    <p class="text-gray-600">Телефон: <span class="font-semibold">{order.phone}</span></p>
    <p class="text-gray-600">Telegram ID: <span class="font-semibold">{order.telegram_id}</span></p>
</div>

<div class="mb-4">
    <p class="text-gray-600">Адреса: <span class="font-semibold">[ {order.address} ]</span></p>
</div>
<div class="mb-4">
    <p class="text-gray-600">Номер накладної пошта: <span class="font-semibold"> {order.nova_poshta} </span></p>
</div>
<div class="mt-4">
    <h2 class="text-xl font-semibold mb-2">Товари в кошику</h2>
    <p class="text-gray-600">Telegram ID: <span class="font-semibold">{ JSON.parse(order.cart_json).toString()}</span></p>
      
    
</div>
<div class="mb-4">
    <p class="text-gray-600">Загальна сума: <span class="font-semibold">{order.sum}</span></p>
</div>

<div class="mb-4">
    <p class="text-gray-600">Коментар: <span class="font-semibold">[ {order.comment} ]</span></p>
</div>

<div class="mb-4">
    <p class="text-gray-600">Статус: <span class="font-semibold text-green-500"> {order.status==0?'Нове замовлення':order.status==1?'Опрацьовано':'Виконане'}</span></p>
</div>
<div class="mb-4 flex gap-1">
<Button variant='outlined' onClick={()=>setOpenEdit(true)}>Редагувати</Button>    
<Button variant='outlined'>Видалити</Button>    
<Button variant='outlined' onClick={handleInProgress} >В Опрацьовані</Button>    
</div>


</div>
       {/* <div className='flex gap-3 mt-5'>
<Button className=""  onClick={()=>{ setOpenDialog(true)}} variant="outlined" startIcon={<DeleteOutlinedIcon />}>
Delete
</Button>

<Button variant="outlined" onClick={handleOpenEdited} startIcon={<EditIcon />}>
Edit
</Button>
       </div> */}
       </div>
    }
   </div> 
  )
}
