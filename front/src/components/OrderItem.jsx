import { Button, Card, CardMedia } from '@mui/material'
import React, { useEffect, useState } from 'react'

import DialogAlert from './DialogAlert';
import useStore from '../store/store';
import ModalEditedOrder from './ModalEditedOrder';
import CopyToClipboardButton from './CopyToClipboardButton';

export default function OrderItem({order,setOrders,setValue}) {
    const [openEdit,setOpenEdit]=useState(false)
    const [openDialog,setOpenDialog]=useState(false)
    const [login,setLogin]=useState("")
    const setInProgress=useStore(state=>state.setInProgress)
    const setInDone=useStore(state=>state.setInDone)
    const setUpdatePAge=useStore(state=>state.setUpdatePAge)
    const deleteOrder=useStore(state=>state.deleteOrder)
    const getLogin=useStore(state=>state.getLogin)
    useEffect(()=>{

     async function getFetch(){
       const data=await getLogin(order.telegram_id,order.phone)
       setLogin(data)
      }
      getFetch()
      
    },[login])
  const handleDeleteOrder=async()=>{
    setOpenDialog(true)
    
  }
  const handleInDone= async ()=>{
    setUpdatePAge()
        await setInDone(order.id)
  }
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
          <DialogAlert textAlert={'Ви хочете видалити замовлення?'}  handlefunction={()=>{
              setUpdatePAge()
            deleteOrder(order.id)}} setOpen={setOpenDialog} open={openDialog  } />
    {
        <div>
              {/* <ModalEdited good={good} setGoods={setGoods} open={openEdit} setOpen={setOpenEdit}  />  */}
   
              <div class="relative  w-[280px] md:w-[400px] bg-white rounded p-6 shadow-md">

<h1 className="text-2xl font-semibold mb-4">Інформація про замовлення</h1>
<CopyToClipboardButton id={order.id}/>
<div class="mt-6">
    <p className="text-gray-600">Ім'я: <span className="font-semibold">{order.name}</span></p>
    <p className="text-gray-600">Логін <span className="font-semibold">{login}</span></p>
    <p className="text-gray-600">Телефон: <span className="font-semibold">{order.phone}</span></p>
    <p className="text-gray-600">Telegram ID: <span className="font-semibold">{order.telegram_id}</span></p>
</div>
<div className="mb-4">
    <p className="text-gray-600">Дата створення: <span className="font-semibold">[ {new Date( order.date).toLocaleString()  } ]</span></p>
</div>
<div className="mb-4">
    <p className="text-gray-600">Адреса: <span className="font-semibold">[ {order.address} ]</span></p>
</div>
<div className="mb-4">
    <p className="text-gray-600">Номер накладної пошта: <span className="font-semibold"> {order.nova_poshta} </span></p>
</div>
<div className="mt-4">
    <h2 className="text-xl font-semibold mb-2">Товари в кошику</h2>
    <p className="text-gray-600"> Замовлення: <span className="font-semibold">{ order.cart_json}</span></p>
      
    
</div>
<div className="mb-4">
    <p className="text-gray-600">Загальна сума: <span className="font-semibold">{order.sum}</span></p>
</div>

<div className="mb-4">
    <p className="text-gray-600">Коментар: <span className="font-semibold">[ {order.comment} ]</span></p>
</div>
<div className="mb-4">
    <p className="text-gray-600">Олата: <span className="font-semibold">Прикріплена оплата  ID:[ {order.id_payment} ]</span></p>
</div>

<div className="mb-4">
    <p className="text-gray-600">Статус: <span className="font-semibold text-green-500"> {order.status==0?'Нове замовлення':order.status==1?'Опрацьовано':'Виконане'}</span></p>
</div>
<div class="mb-4 flex gap-1  ">
<Button sx={{ fontSize:10}} variant='outlined' onClick={()=>setOpenEdit(true)}>Редагувати</Button>    
<Button sx={{ fontSize:10}} variant='outlined'onClick={handleDeleteOrder} >Видалити</Button>    
{
  order.status!="2"?  (order.status=="0"?<Button sx={{ fontSize:10}} variant='outlined' onClick={handleInProgress} >В Опрацьовані</Button>    
    :
    <Button  sx={{ fontSize:10}} variant='outlined' onClick={handleInDone} >У Виконані</Button>   
):""

}
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
