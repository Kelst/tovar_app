import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/store';
import InfoBars from '../../components/InfoBars';


export default function Login() {
    
    const [login,setLogin]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [text, setText] = React.useState('');
    const [open,setOpen]=React.useState(false)
    const logIn=useStore(store=>store.logIn)
    const navigate=useNavigate()
    const handleLogin=(e)=>{
        setLogin(e.currentTarget.value)
    }
    function showInfo(text){
        setText(text)
        setOpen(true)
      }
      
    const handlePassword=(e)=>{
        setPassword(e.currentTarget.value)
    } 
  const handleSubmit  =async (event) => {
    event.preventDefault();
    let flag=await logIn(login,password)
    console.log(flag);
    if(flag){
        Cookies.set('login',login, { expires: 0.02083 });
        navigate("/home")
    }else{
        showInfo("Невірний логін або пароль")
    }

  };

  return (

      <Container component="main" maxWidth="xs">
       
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'rgb(255, 103, 71)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
              value={login}
              onChange={handleLogin}
            />
            <TextField
            value={password}
            onChange={handlePassword}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
              
            >
              Sign In
            </Button>
        
          </Box>
        </Box>
    <InfoBars open={open} setOpen={setOpen} text={text}/>  
      </Container>

  );
}