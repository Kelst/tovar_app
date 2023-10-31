import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import useStore from '../../store/store'
import EditedTable from '../../components/EditedTable'
import EditTab from '../../components/EditTab'

export default function Home() {


 

  return ( 
    <div>
      <Container maxWidth="xl"  sx={{mt:"20px"}}>
             
              <EditTab/>

      </Container>
    </div>
  )
}
