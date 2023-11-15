import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import useStore from '../store/store';
import TabPanels from './TabPanel';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ModalAddCat from './ModalAddCat';
import DialogAlert from './DialogAlert';
import ModalDeleteCat from './ModalDeleteCat';
import TabPanelOrder from './TabPanelOrder';
export default function OrdersTab() {

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const cat=useStore(state=>state.cat)
  const [value, setValue] = React.useState(`0`);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

const handleAddCat=()=>{
  setOpenAdd(true)
}

const handleRemoveCat=()=>{
  setOpenDelete(true)
}
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
     
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
         
          <TabList scrollButtons="auto"  onChange={handleChange} aria-label="lab API tabs example">
          
           
                 <Tab  key={0} label="Нові замовлення" value={`${0}`} />
                 <Tab key={1} label="Опрацьовані замовлення" value={`${1}`} />
                 <Tab key={2} label="Виконані замовлення" value={`${2}`} />
            
          </TabList>

        </Box>
        
        {
            [0,1,2].map(e=>{
              
               return <TabPanelOrder key={e} update={value} value={`${e}`} setValue={setValue}/> 
            })
        }
      
   
      
      </TabContext>
    </Box>
  );
}