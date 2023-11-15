import axios from 'axios'
import { create } from 'zustand'
import $api from '../http'; 
// import AuthService from '../services/AuthService'
// import UserService from '../services/UserService'
const useStore = create( (set,get) => ({
  login:"",
  isAuth:true,
  cat:[],
  goods:[],
  mgoods:[],
  loader:false,
  alertText:"", 
  alertOpen:false,
  updatePAge:0,
 imageUrl:"",
 setUpdatePAge:()=>{
  set(state=>({...state,updatePAge:state.updatePAge+1}))
 },
  setInProgress:async(id,state)=>{

    try {
       let b= await $api.post("/move-order-up",{id:id,state:state<2?state+1:state})
       console.log(b);
      
    } catch (e) {
      console.log(e);
      
    }
 },
 logIn:async(login,pass)=>{
  let resp= await axios.post("https://shop-intelekt.pp.ua/api/login",{login:login.trim(),password:pass.trim()})
  let data=resp.data

  if(data.flag){
      return true
  }else return false
 },
 updateUrl(text,id){
   
  let arr=get().mgoods.map(e=>{
    if(e.id==id){
      return {...e,url:text}
    }
    return e
  })
  set(state=>({...state,goods:[...state.goods,...arr]})) 

 },

 setImageUrl(text){
  console.log(text,"DDDDDDDDDDDDDDD");
  set(state=>({...state,imageUrl:text}))

 },
  setAlertText(text){
    set(state=>({...state,alertText:text}))
},
setAlertOpen(f){
  set(state=>({...state,alertOpen:f}))
},
  setLoader (f){
          set(state=>({...state,loader:f}))
  },
 
  async getAllGoods () {
    try {
      const response=await $api.get("/get-all-goods")
      const data=response.data

      set(state=>({goods:[...data]}))
    } catch (error) {
      console.log(error);
      
    }
  },
  async getGoods (id_cat) {
    try {
     
      const response=await $api.post("/get-all-goods-by-cat",{id_cat:id_cat})
      const data=response.data
     return data
    } catch (error) {
      console.log(error);
      
    }
  },
  async getOrders (id_cat) {
    try {
     
      const response=await $api.post("/get-all-orders-by-cat",{id_cat:id_cat})
      const data=response.data
     return data
    } catch (error) {
      console.log(error);
      
    }
  },
  async getAllCat () {
    try {
      const response=await $api.get("/get-all-cat")
      const data=response.data
     
      set(state=>({...state,cat:[...data]}))
    } catch (error) {
      console.log(error);
      
    }
  },
  async deleteGood (id) {
    try {
      const response=await $api.put("/delete-good",{id:id})
      const data=response.data

    } catch (error) {
      console.log(error);
      
    }
  },
  async deleteCat (id) {
    try {
      const response=await $api.put("/delete-cat",{id:id})
      const data= response.data
      const newcat=get().cat.filter(e=>e.id!=id)
      set(state=>({...state,cat:[...newcat]}))

    } catch (error) {
      console.log(error);
      
    }
  },
  modiffyCat(){ 
     
    const data=get().goods.map(e=>({...e,cat:get().cat.filter(e1=>e1.id==e.id_cat)[0]?.cat}))
    
   set(state=>({...state,mgoods:[...data]}))

  },
  async updateRows(updatedRow){
 try {
  
  get().setLoader(true)
  const response= await $api.put('/update-good',{
    ...updatedRow
  })
  set(state=>({...state.goods,goods:[...rows]}))
  get().setLoader(true)
 } catch (error) {
  
 }
 finally {
  get().setLoader(false)
 }
  

  },
  async updateRowsOrder(updatedRow){
    try {
     
     get().setLoader(true)
     const response= await $api.put('/update-order',{
      order:updatedRow
     })
     console.log(response);
     get().setLoader(true)
    } catch (error) {
     
    }
    finally {
     get().setLoader(false)
    }
     
   
     },
  async addCat(cat){
    try {
      const resp= await $api.post("/add-cat",{...cat})
      const data=resp.data
      set(state=>({...state,cat:[...state.cat,data]}))
      return data
    } catch (error) {
      return false
    }

  },
  async addGood(good){
    try {
      const resp= await $api.post("/add-good",{...good})
      const data=resp.data
      return data
      
    } catch (error) {
      return false
    }

  }

  }))
  export default useStore
  