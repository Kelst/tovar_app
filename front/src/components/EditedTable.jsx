import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import axios from 'axios';
import useStore from '../store/store';


function FileInput1({ onChange }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <input
      type="file"
      accept=".csv, application/vnd.openxmlformats, application/vnd.ms-excel"
      onChange={handleFileChange}
    />
  );
}



function FileInput({ value, onFileChange}) {
  const setLoader=useStore(state=>state.setLoader)
  const setImageUrl=useStore(state=>state.setImageUrl)

  const setAlertText=useStore(state=>state.setAlertText)
  const setAlertOpen=useStore(state=>state.setAlertOpen)

  const  handleFileChange = async (e) => {
    
    let resp
    const selectedFile = e.target.files[0];
    onFileChange(selectedFile);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('value', value);
    try{
    setLoader(true)
   
    resp=await axios.post('http://194.8.147.150:4001/api/storage', formData, {
     
  headers: {
    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
  },
})

  setImageUrl(resp.data)
  setLoader(false)
  setAlertText("Зображення завантажено")
  setAlertOpen(true)


}
catch(e){
  setAlertText("Помилка при завантаженні зображення")
  setAlertOpen(true)
}
finally {

  setLoader(false)
  setImageUrl(resp.data)

  if(resp.data){
  
    setAlertText("Зображення завантажено")
    setAlertOpen(true)  
    return resp.data

  }else {
  
    setAlertText("Зображення не завантажено")
    setAlertOpen(true)
      return resp.data
  }
 
}
 
  };

  return (
    <input type="file"  onChange={handleFileChange} />
  );
}

function EditToolbar(props) {
  const { setRows, setRowModesModel,shop_goods } = props;


  const handleClick = () => {
  const id=shop_goods.length+1

    setRows((oldRows) => [...oldRows, {
      id,
      name: '',
     cost: '', 
     cat:"",
     text: "",
     quantity:"",
     url:"",
     title:"",
     state:"1",
     unique_price:"",
     uniques:"1"
    }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function EditedTable({shop_goods,shop_cat}) {
 
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const imageUrl=useStore(state=>state.imageUrl)
  const updateRows=useStore(state=>state.updateRows)
  const deleteGood=useStore(state=>state.deleteGood)
  const setImageUrl=useStore(state=>state.setImageUrl)
  
  React.useEffect(()=>{
   setRows(shop_goods)


  },[shop_goods,imageUrl])
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    console.log(rowModesModel);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick =  (id) =>async () => {
    let deleteG=rows.filter((row) => row.id !== id)
   await deleteGood(id,deleteG)
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow,url:imageUrl, isNew: false };
    setImageUrl("")
    
    //зробити запит на сервак обновити дані
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    await updateRows(rows,updatedRow)
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'name', headerName: 'Назва', width: 180, editable: true },
    {
      field: 'cat',
      headerName: 'Категорія',
      width: 130,
      editable: true,
      type: 'singleSelect',
      valueOptions: shop_cat.map(e=>e.cat),
    },
    {
      field: 'cost',
      headerName: 'Ціна',
      type: 'number',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'text',
      headerName: 'Опис',
      type: 'string',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'quantity',
      headerName: 'Кількість',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'number',
     
    },
    {
      field: 'url',
      headerName: 'Картинка',
      editable: true,
      width: 350,
      type:"file",
      renderEditCell: (params) => (
        <FileInput
          value={params.value}
          onFileChange={(file) =>{
            params.api.setEditCellValue({ value: file, field: 'url' })}}
        />
      ),
    
    },
    {
      field: 'title',
      headerName: 'Заголовок',
      width: 220,
      editable: true,
      type: 'string',
    
    }, 
    {
      field: 'state',
      headerName: 'State',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'number',
    
    },
    {
      field: 'unique_price',
      headerName: 'Ціна тижня',
      width: 100,
      editable: true,
      type: 'number',
    
    },
    {
      field: 'uniques',
      headerName: 'Unique',
      width: 100,
      editable: true,
      type: 'number',
    
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ]; 
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',

  
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
   
        autoHeight
        
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel,shop_goods },
        }}
      />
    </Box>
  );
}
