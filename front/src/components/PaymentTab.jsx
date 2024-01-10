import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SelectedCustum from './SelectedCustum';
import useStore from '../store/store';
function checkIdInPaymentsAndOrders(data, id) {
  // Перевірка в масиві payment
  for (let payment of data.payment) {
      if (payment.id === id) {
          return true;
      }
  }

  // Перевірка в масиві orders
  for (let order of data.orders) {
      if (order.id_payment === id) {
          return true;
      }
  }

  // Якщо id не знайдено в жодному з масивів
  return false;
}
export default function PaymentTab({open,setOpen}) {

  const [payment,setPayment]=React.useState(null)
  const [flag,setFlag]=React.useState(false)
  const getPayment=useStore(state=>state.getPayment) 
  React.useEffect(()=>{
    async function  fetchData(id) 
    {
      
       const data1=await getPayment()
       setPayment(data1)
       console.log(data1,"FIRST");
    }
    fetchData()
  },[flag])
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullScreen
      >
        <DialogTitle id="responsive-dialog-title">
          {"Отримані оплати"}
        </DialogTitle>
        <DialogContent>
            {
                  !payment?.payment&&'Немає оплат'
            }
            <div  className=' border p-10  grid grid-cols-2  gap-2 '>
                <div>
            {
                payment?.payment.map(e=>{
                  let flag=checkIdInPaymentsAndOrders(payment,e.id)
                return <div  key={e.id} className={flag?'bg-green-200 p-2 rounded mb-1':` border p-2 `}>
                  {flag?<p className=' uppercase font-bold'>Рахунок прикріплений до замовлення </p>:""}
                         <p>Кошти поступили: <span className=' font-bold'>  {new Date( e.date).toLocaleString()}</span></p> 
                         <div className=' mb-6' >Сума  <span className=' font-bold'>{e.sum}</span></div> 
                    
                       </div>
                })
            }</div>
            <div>

            
            {
                 payment?.orders.map(e=>{
                  
                    return <div key={e.id} className=' border p-2 '>
                             <p> Замовлення:  <span className=' font-bold'> {new Date( e.date).toLocaleString()}</span> Сума замовлення:  <span className=' font-bold'> {e.sum}</span> Номер замовлення: <span className=' font-bold'> {e.id}</span> </p> 
                             <div  className=' font-bold mb-6'> {e.name}</div> 
                             <SelectedCustum pays={payment?.payment} payment={payment} idOrders={e?.id} order={e} setFlag={setFlag} />
                           </div>
                    })
            }
            </div>
           </div>


        </DialogContent>
        <DialogActions>
       
          <Button  onClick={handleClose}>
            Закрити
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}