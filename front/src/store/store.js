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

 deleteOrder: async (id)=>{
  try {
    const response=await $api.put("/delete-order",{id:id})
    const data= response.data
    return true

  } catch (error) {
    return false
    console.log(error);
    
  }
 },
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
 setInDone:async(id,state)=>{

  try {
     let b= await $api.post("/move-order-done",{id:id,state:3})
     console.log(b);
    
  } catch (e) {
    console.log(e);
    
  }
},
 logIn:async(login,pass)=>{
  let resp= await axios.post("https://shop-intelekt.pp.ua/api/login",{login:login?.trim(),password:pass?.trim()})
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

      set(state=>({...state,goods:[...data]}))
    } catch (error) {
      console.log(error);
      
    }
  },

  async getPayByLogin (login,sum,orderId) {
    try {
     
      const response=await $api.post("/get-pay-by-login",{login:login,sum:sum,orderId:orderId})
      const data=response.data
     return data
    } catch (error) {
      console.log(error);
      
    }
  },
  async getPayByLoginDeposit (login,sum,orderId) {
    try {
      const response=await $api.post("/get-pay-by-login-deposit",{login:login,sum:sum,orderId:orderId})
      const data=response.data
      console.log("DEPOSIT",data);
     return data
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
  async getPayment () {
    try {
      const response=await $api.get("/get-all-payment/")
      const data=response.data
      console.log(data);
     return data
    } catch (error) {
      console.log(error);
      
    }
  },
  async getOrder (id_cat) {
    try {
      const response=await $api.post("/get-order",{id:id_cat})
      const data=response.data
      console.log(data);
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
  async getLogin (id,phone) {
    try {
      const response=await $api.post("/get-login/",{id:id,phone:phone})
      const data=response.data
      if(data==false){
        return ''
      }
      return data
    } catch (error) { 
      console.log(error,"GET LOGIN");
      return ''
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
  async setPayment(id,id_payment){
    try {
      try {
        const response=await $api.put("/set-payment",{id:id,id_payment:id_payment})
        const data= response.data
        if(data.flag==true){
       
     
          set(state=>({...state,alertText:"Привязано оплату до замовлення",alertOpen:true}))
         
          return true


        }else {           console.log(data,"DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        set(state=>({...state,alertText:data.desc,alertOpen:true}))
         return false}
      } catch (error) {
        return false
        console.log(error);
        
      }
      const data=resp.data
      set(state=>({...state,cat:[...state.cat,data]}))
      return data
    } catch (error) {
      return false
    }

  },


  async sendSms(order){
   
    try {
      try {
        const response=await $api.post("/send-sms",{order:order})
        const data= response.data
        if(data==true){
       
     
          set(state=>({...state,alertText:"Повідомлення надіслано",alertOpen:true}))
         
          return true


        }else {   
            
        set(state=>({...state,alertText:'Помилка при надсиланні смс',alertOpen:true}))
         return false}
      } catch (error) {
        
         console.log(error);
        return false
       
        
      }
     
    } catch (error) {
      return false
    }

  },
  async sendSmsPayments(order,text){
   
    try {
      try {
        const response=await $api.post("/send-sms-payment",{order:order,text:text})
        const data= response.data
        if(data==true){
       
     
          set(state=>({...state,alertText:"Повідомлення надіслано",alertOpen:true}))
         
          return true


        }else {   
            
        set(state=>({...state,alertText:'Помилка при надсиланні смс',alertOpen:true}))
         return false}
      } catch (error) {
        
         console.log(error);
        return false
       
        
      }
     
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
      console.log(error,"FROM ADD GOOD");
      return false
    }

  }

  }))
  export default useStore
  