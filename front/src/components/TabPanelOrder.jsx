import React, { useEffect, useState } from 'react'
import TabPanel from '@mui/lab/TabPanel';
import useStore from '../store/store';
import AddIcon from '@mui/icons-material/Add';
import { Button, Card, CardMedia } from '@mui/material';
import CardItem from './CardItem';
import ModalAdd from './ModalAdd';
import OrderItem from './OrderItem';
export default function TabPanelOrder({value,setValue,update}) {
    const getOrders=useStore(state=>state.getOrders)
    const [orders,setOrders]=useState([])
    const [openAdd,setOpenAdd]=useState(false)
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


    },[update,updatePAge])

    
  return (
   
    <TabPanel value={value} sx={{ display: "grid", gridTemplateColumns: " repeat(3, 0.5fr)", gap:2, }} >
        {
            orders.map(e=>{
            return    <OrderItem order={e} setOrders={setOrders}setValue={setValue} />
            })
        }
    
       
        
    </TabPanel>
  )
}
