'use client'

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiList-root': {
    padding: 0, // Remove default padding for cleaner look
    backgroundColor: theme.palette.grey[200], // Set background color to grey
  },
  '& .MuiMenuItem-root': {
    display: 'flex', // Allow for side-by-side placement of icon and text
    alignItems: 'center', // Align icon and text vertically
  },
}));

const MyAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Implement dark mode toggle logic here, such as updating a context or theme provider
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleMenuClose(); // Close the dropdown after logout
    router.push('/');
    console.log('Logout initiated!'); 
  };


  return (
    <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="flex items-center">
          <img src="/humic.svg" alt="Logo" className="h-14" />
        </Typography>
        <div className="flex items-center space-x-4">
          <Switch checked={darkMode} onChange={handleDarkModeToggle} color="default" />
          <IconButton onClick={handleMenuOpen}>
            <Avatar alt="Avatar" src="/path/to/your/avatar.jpg" />
          </IconButton>
          <StyledMenu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout} className='hover:bg-red-700 hover:text-white rounded-none'>
              <LogoutIcon /> {/* Add your LogoutIcon component here */}
              <span style={{ marginLeft: '10px' }}>Logout</span>
            </MenuItem>
          </StyledMenu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
