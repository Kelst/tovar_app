import axios from "axios";

export const API_URL=`https://shop-intelekt.pp.ua/api`
const $api=axios.create({
   
    baseURL:API_URL
})
$api.interceptors.request.use((config)=>{
    config.headers.Authorization=`458d447DD()556;521357`
    return config
})

export default $api