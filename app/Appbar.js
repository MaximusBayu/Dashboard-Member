'use client'

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';

const MyAppBar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Implement dark mode toggle logic here, such as updating a context or theme provider
  };

  return (
    <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="flex items-center">
          <img src="/humic.svg" alt="Logo" className="h-14" />
        </Typography>
        <div className="flex items-center space-x-4">
          <Switch
            checked={darkMode}
            onChange={handleDarkModeToggle}
            color="default"
          />
          <IconButton>
            <Avatar alt="User Avatar" src="/path/to/your/avatar.jpg" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
