import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../store/store'
import OrderItem from './OrderItem'

export default function Order() {
    const {id}=useParams()
    const [order,setOrder]=useState({})
    const getOrder=useStore(state=>state.getOrder)

    useEffect(()=>{
       async function fetchD(){
            const data =await getOrder(id)
            setOrder(data[0])
        }
fetchD()
    },[])


  return (
    <div className=' mt-10'>
        
  <OrderItem  order={order} setOrders={setOrder}  /></div>
  )
}
