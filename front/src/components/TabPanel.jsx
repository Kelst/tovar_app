import React, { useEffect, useState } from 'react'
import TabPanel from '@mui/lab/TabPanel';
import useStore from '../store/store';
import AddIcon from '@mui/icons-material/Add';
import { Button, Card, CardMedia } from '@mui/material';
import CardItem from './CardItem';
import ModalAdd from './ModalAdd';
export default function TabPanels({value}) {
    const getGoods=useStore(state=>state.getGoods)
    const [goods,setGoods]=useState([])
    const [openAdd,setOpenAdd]=useState(false)

    const handleAddGood=()=>{
        setOpenAdd(true)
    }
    useEffect(()=>{
       async function  fetchData(id) 
        {
           const data=await getGoods(id)

          
           setGoods(data)
        }
        fetchData(value)


    },[])

    
  return (
   
    <TabPanel value={value} >
        <ModalAdd  id_cat={value} open={openAdd} setOpen={setOpenAdd} setGoods={setGoods} />
        <Button variant='outlined' onClick={()=>handleAddGood()} startIcon={<AddIcon/>}>Додати Товар</Button>
        {
            goods.map(e=>{
            return    <CardItem good={e} setGoods={setGoods}/>
            })
        }
    
       
        
    </TabPanel>
  )
}
