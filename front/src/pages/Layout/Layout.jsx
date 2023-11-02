
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../../components/Navigation'
 import useStore from '../../store/store'
import Loader from '../../components/Loader'
import Allert from '../../components/Allert'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export default function Layout() {

 const getAllGoods=useStore(store=>store.getAllGoods)
 const getAllCat=useStore(store=>store.getAllCat)
 const goods=useStore(store=>store.goods)
 const modiffyCat=useStore(store=>store.modiffyCat) 
 const navigate=useNavigate()


 useEffect(()=>{
  async function  fetchData() {
    await getAllGoods()
    await getAllCat()
    modiffyCat()
    const cookieData = Cookies.get('login');
  
    if (!cookieData) {
      navigate("/login") 
    }
    
  }
fetchData()
 },[])
  return (
    <div>
      <Loader/>
      <Allert/>
       <div>
        <Navigation/>
        </div>   
    
        <div> 
             <Outlet/>
        </div> 
    </div>
  )
}
