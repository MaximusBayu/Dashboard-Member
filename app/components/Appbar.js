'use client'

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiList-root': {
    padding: 0, 
    backgroundColor: theme.palette.grey[200], 
  },
  '& .MuiMenuItem-root': {
    display: 'flex', 
    alignItems: 'center', 
  },
}));

const MyAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [adminName, setAdminName] = useState("Admin"); 
  const [avatarSrc, setAvatarSrc] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setAdminName(decoded.username);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/get/${decoded.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setAvatarSrc(data.response.foto || null);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchAdminData();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleMenuClose(); 
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
          <IconButton onClick={handleMenuOpen}>
            <Avatar alt={adminName} src={avatarSrc}>
              {!avatarSrc && adminName[0]}
            </Avatar>
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
              <LogoutIcon />
              <span style={{ marginLeft: '10px' }}>Logout</span>
            </MenuItem>
          </StyledMenu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
