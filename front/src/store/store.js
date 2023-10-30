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
 imageUrl:"",

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
  async getAllCat () {
    try {
      const response=await $api.get("/get-all-cat")
      const data=response.data
     
      set(state=>({...state,cat:[...data]}))
    } catch (error) {
      console.log(error);
      
    }
  },
  async deleteGood (id,good) {
    try {
      const response=await $api.put("/delete-good",{id:id})
      const data=response.data
      
      set(state=>({...state,goods:[...good]}))
      get().modiffyCat()

    } catch (error) {
      console.log(error);
      
    }
  },
  modiffyCat(){ 
     
    const data=get().goods.map(e=>({...e,cat:get().cat.filter(e1=>e1.id==e.id_cat)[0]?.cat}))
    
   set(state=>({...state,mgoods:[...data]}))

  },
  async updateRows(rows,updatedRow){
 try {
   
  

  const response= await $api.put('/update-good',{
    ...updatedRow,id_cat:get().cat.filter(e=>e.cat==updatedRow.cat).id
  })
  set(state=>({...state.goods,goods:[...rows]}))
  // get().getAllGoods()
  // get().modiffyCat()




 } catch (error) {
  
 }
  

  }

  }))
  export default useStore
  