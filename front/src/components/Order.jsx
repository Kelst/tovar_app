import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useStore from '../store/store'
import OrderItem from './OrderItem'
import { Button } from '@mui/material'

export default function Order() {
    const {id}=useParams()
    const [order,setOrder]=useState(undefined)
    const getOrder=useStore(state=>state.getOrder)
    const navigate=useNavigate()

    useEffect(()=>{
       async function fetchD(){
            const data =await getOrder(id)
            if(data.length==0){ return}
            setOrder(data[0])
        }
fetchD()
    },[])


  return (
  
    <div className=' mt-10 w-[200px] '>
          {
      !order?
      <div>
             <button type="button"  onClick={()=>navigate("/orders")} className=" absolute left-[30%] top-[123px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg  className="  mr-2  rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
Замовлення
</button>
      <div className=' text-center text-xl p-5 bg-blue-200 '>Товар не знайдений </div></div>
      :
   <div>
        <button type="button" onClick={()=>navigate("/orders")} className="ml-[25%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg  className="  mr-2  rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
Замовлення
</button>
<div className='w-[50%] mx-auto'>
  <OrderItem  order={order} setOrders={setOrder}  />
  </div></div>
   }
  </div>
  )
}
