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


    },[value,updatePAge])

    
  return (
   
    <TabPanel value={value} className='grid w-[350px]  grid-cols-1 gap-1 md:grid-cols-3 md:gap-x-[200px] md:w-[1200px] absolute top-[150px]' >
        {
          orders.length!=0?
            orders.map(e=>{
            return    <OrderItem key={e.id} order={e} setOrders={setOrders}setValue={setValue} />
            })
            :<div className=' text-left font-bold text-2xl'>
              <p>Немає замовлень в цій категорії</p>
            </div>
        }
    
       
        
    </TabPanel>
  )
}
