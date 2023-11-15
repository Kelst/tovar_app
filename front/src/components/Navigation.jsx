import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
const pages = ['Товари', 'Замовлення', 'Історія'];


export default function Navigation() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [menuItem, setMenuItem] = React.useState("Item1");
    const navigate=useLocation()
    
     useEffect(()=>{
       if(navigate.pathname=="/orders"){
        setMenuItem("Item2")
       }
     },[])

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

  
    const handleCloseNavMenu = (item) => {
        setMenuItem(item)
      setAnchorElNav(null);
    };
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SettingsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Intelekt
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) =>        {
                
                if(page=='Замовлення')
                {
                  return  <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <NavLink to={"/orders"}> <Typography textAlign="center">{page}</Typography></NavLink>
                 </MenuItem>
                } else 
                return  <MenuItem key={page} onClick={handleCloseNavMenu}>
                 <NavLink to={"/"}> <Typography textAlign="center">{page}</Typography></NavLink>
                </MenuItem>}
              )}
            </Menu>
          </Box>
          <SettingsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Intelekt shop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {
                <>
                <NavLink to="/" >
                <Button
                key={1}
                onClick={()=>handleCloseNavMenu("Item1")}
                sx={{ my: 2, color: menuItem=='Item1'?'black': 'white', display: 'block' }
            }
            
              >
                Товари
              </Button>
                </NavLink>
                <NavLink to="/orders" >
                <Button
                key={1}
                onClick={()=>handleCloseNavMenu("Item2")}
                sx={{ my: 2, color: menuItem=='Item2'?'black': 'white', display: 'block' }}
              >
                Замовлення
              </Button>
                </NavLink>
                {/* <NavLink to="/">
                <Button
                key={1}
                onClick={()=>handleCloseNavMenu("Item3")}
                sx={{ my: 2, color: menuItem=='Item3'?'black': 'white', display: 'block' }}
              >
                Історія
              </Button>
                </NavLink> */}
                </>
                
            }
         
          </Box>

       
        </Toolbar>
      </Container>
    </AppBar>
  )
}
