import { Container } from '@mui/material'
import React from 'react'
import EditTab from '../../components/EditTab'
import OrdersTab from '../../components/OrdersTab'

export default function Orders() {
  return (
    <Container maxWidth="xl"  sx={{mt:"20px"}}>
             
     <OrdersTab/>

</Container>  
  )
}
