import React, { useEffect, useState } from 'react'
import TabPanel from '@mui/lab/TabPanel';
import useStore from '../store/store';
import AddIcon from '@mui/icons-material/Add';
import { Button, Card, CardMedia, TextField } from '@mui/material';
import CardItem from './CardItem';
import ModalAdd from './ModalAdd';
import OrderItem from './OrderItem';
export default function TabPanelOrder({value,setValue,update}) {
    const getOrders=useStore(state=>state.getOrders)
    const [orders,setOrders]=useState([])
    const [openAdd,setOpenAdd]=useState(false)
    const [search,setSearch]=React.useState("")

const updatePAge=useStore(state=>state.updatePAge)
    const handleAddGood=()=>{
        setOpenAdd(true)
    }
    useEffect(()=>{
      console.log("UPDATE");
       async function  fetchData(id) 
        {
           const data=await getOrders(id)

          
           setOrders(data)
        }
        fetchData(value)


    },[value,updatePAge,search])

    
  return (
   
    <TabPanel value={value} className='grid w-[280px]  grid-cols-1 gap-1 md:grid-cols-3 md:gap-x-[200px] md:w-[1200px] absolute top-[180px] ' >
      <div className=' absolute top-[20px] left-5 '> <TextField 
          id="standard-search"
          label="Пошук"
          type="search"
          value={search}
          onChange={(e)=>{
            setSearch(e.target.value)
          }}
          variant="standard"
       sx={{marginLeft:"5px",marginTop:"-60px"}}
        /></div>
   {orders.length !== 0 ? (
  orders
    .filter((e) => e.phone.includes(search) ||  // Шукаємо в phone
    e.name.toLowerCase().includes(search.toLowerCase()))// Фільтруємо масив за входженням search в поле "phone"
    .map((e) => <OrderItem key={e.id} order={e} setOrders={setOrders} setValue={setValue} />)
) : (
  <div className='text-left font-bold text-2xl'>
    <p>Немає замовлень в цій категорії</p>
  </div>
)}
       
        
    </TabPanel>
  )
}
