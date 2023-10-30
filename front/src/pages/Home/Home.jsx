import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import useStore from '../../store/store'
import EditedTable from '../../components/EditedTable'

export default function Home() {

  const mgoods=useStore(store=>store.mgoods)
  const cat=useStore(store=>store.cat) 
 

  return ( 
    <div>
      <Container maxWidth="xl"  sx={{mt:"20px"}}>
              {/* <EditedTable shop_goods={mgoods} shop_cat={cat}/> */}
              
      </Container>
    </div>
  )
}
