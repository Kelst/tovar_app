import axios from "axios";

export const API_URL=`http://194.8.147.150:4001/api/`
const $api=axios.create({
   
    baseURL:API_URL
})
$api.interceptors.request.use((config)=>{
    config.headers.Authorization=`458d447DD()556;521357`
    return config
})

export default $api