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
export default function EditTab() {

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const cat=useStore(state=>state.cat)
  const [value, setValue] = React.useState(`2`);
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
       <ModalDeleteCat open={openDelete} setOpen={setOpenDelete}/>
      <ModalAddCat open={openAdd} setOpen={setOpenAdd} />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <div className='flex justify-start   top-0 gap-0  md:justify-end md:top-10'>
            <div className=' w-40 z-100'>
        <Button onClick={handleAddCat} className=' w-40 ' startIcon={<AddCircleOutlineIcon className='' />}/>
        <Button onClick={handleRemoveCat} className=' w-40 '  startIcon={<RemoveCircleOutlineIcon/>}/>
        </div></div>

          <TabList className=' ' onChange={handleChange} aria-label="lab API tabs example">
            {
                cat.map(e=>{
                    return   <Tab key={e.id} label={e.cat} value={`${e.id}`} />
                })
            }
          </TabList>

        </Box>
        
        {
            cat.map(e=>{
              
               return <TabPanels value={`${e.id}`}/>
            })
        }
      
   
      
      </TabContext>
    </Box>
  );
}