import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import useStore from '../store/store';

export default function SelectedCustum({pays,idOrders}) {
    const [pay, setPay] = React.useState('');
    const setPayment=useStore(state=>state.setPayment)
    const handleChange = (event) => {
      setPay(event.target.value);
    };
  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Оплати</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={pay}
        label="Заявки"
        onChange={handleChange}
      >
        <MenuItem value={0}>"_____"</MenuItem>
        {
            pays.map((e,index)=>{
                return  <MenuItem value={e.id}>Сума {e.sum} дата: {new Date( e.date).toLocaleString()}</MenuItem>
            })
        }
       
       
      </Select>
    </FormControl>
     <Button disabled={pay==0?true:false}  onClick={async ()=>{
      await  setPayment(idOrders,pay)
     }}  >Привязати </Button>
  </Box>
  )
}
