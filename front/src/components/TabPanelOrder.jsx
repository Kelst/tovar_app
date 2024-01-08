import React, { useEffect, useState } from 'react'
import TabPanel from '@mui/lab/TabPanel';
import useStore from '../store/store';
import AddIcon from '@mui/icons-material/Add';
import { Button, Card, CardMedia, TextField } from '@mui/material';
import CardItem from './CardItem';
import ModalAdd from './ModalAdd';
import OrderItem from './OrderItem';
import PaymentTab from './PaymentTab';
export default function TabPanelOrder({value,setValue,update}) {
    const getOrders=useStore(state=>state.getOrders)
    const getPayment=useStore(state=>state.getPayment)
    const [orders,setOrders]=useState([])
    const [payment,setPayment]=useState(null)
    const [search,setSearch]=React.useState("")
    const [open, setOpen] = React.useState(false);

const updatePAge=useStore(state=>state.updatePAge)
const handlePayment=()=>{
    setOpen(true)
}
    useEffect(()=>{
      console.log("UPDATE");
       async function  fetchData(id) 
        {
           const data=await getOrders(id)
           setOrders(data)
           const data1=await getPayment()
           setPayment(data1)
           console.log(data1,"FIRST");
        }
        fetchData(value)
    },[value,updatePAge,search])

    
  return (
   
    <TabPanel value={value} className='grid w-[280px]  grid-cols-1 gap-1 md:grid-cols-3 md:gap-x-[200px] md:w-[1200px] absolute top-[180px] ' >
      <div className=' absolute top-[20px] left-5  '>
         <TextField 
          id="standard-search"
          label="Пошук"
          type="search"
          value={search}
          onChange={(e)=>{
            setSearch(e.target.value)
          }}
          variant="standard"
       sx={{marginLeft:"5px",marginTop:"-60px"}}
        />
        
        </div>

           {
           
           value==0&& <div className=' absolute top-[-25px] right-[60%] z-10'>
            <PaymentTab open={open} setOpen={setOpen} payment={payment}/>  
           <Button variant="contained" onClick={handlePayment}>Оплати</Button>
</div>}
   {orders.length !== 0 ? (
  orders
    .filter((e) => e.phone.includes(search) || 
    e.name.toLowerCase().includes(search.toLowerCase()))
    .map((e) => <OrderItem key={e.id} order={e} setOrders={setOrders} setValue={setValue} />)
) : (
  <div className='text-left font-bold text-2xl'>
    <p>Немає замовлень в цій категорії</p>
  </div>
)}
       
        

    </TabPanel>
  )
}
