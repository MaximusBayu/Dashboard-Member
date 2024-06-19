'use client'

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HistoryIcon from '@mui/icons-material/History';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode library to decode JWT tokens

const SideNavbar = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false); // State to determine admin role
  const adminName = "Admin";

  useEffect(() => {
    // Function to check if user is admin based on token
    const checkAdminRole = () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (token) {
        const decoded = jwtDecode(token); // Decode the token payload
        const userRole = decoded.role; // Assuming 'role' is the key in token payload for role
        setIsAdmin(userRole === 'admin'); // Set isAdmin state based on role
      }
    };

    checkAdminRole(); // Call function on component mount
  }, []);

  return (
    <div className="h-screen fixed top-20 pb-24 w-64 bg-white text-gray-700 flex flex-col items-center py-10 rounded-r-3xl border border-gray-300 shadow-xl">
      <Avatar
        alt="Admin"
        src="/avatar.jpg"
        sx={{ width: 80, height: 80 }}
        className="mb-6"
      />
      <div className="mb-6 text-lg font-bold">{adminName}</div>
      <div className="mb-6"></div>
      <div className='w-full px-8'>
        <Button
          startIcon={<HomeIcon />}
          onClick={() => router.push('/dashboard')}
          className="mb-4 pr-20 text-sm hover:shadow-lg"
          sx={{
            color: 'grey',
            justifyContent: 'start',
            '&:hover': {
              backgroundColor: '#B22824',
              color: 'white',
            },
          }}
        >
          Beranda
        </Button>
      </div>
      {isAdmin && (
        <>
          <div className='w-full px-8'>
            <Button
              startIcon={<PersonAddIcon />}
              onClick={() => router.push('/dashboard/registermember')}
              className="mb-4 pr-7 text-sm text-nowrap hover:shadow-lg"
              sx={{
                color: 'grey',
                justifyContent: 'start',
                '&:hover': {
                  backgroundColor: '#B22824',
                  color: 'white',
                },
              }}
            >
              Register Akun
            </Button>
          </div>
          <div className='w-full px-8'>
            <Button
              startIcon={<HistoryIcon />}
              onClick={() => router.push('/dashboard/riwayatmasukkan')}
              className="mb-4 text-sm max-w-64 hover:shadow-lg"
              sx={{
                color: 'grey',
                justifyContent: 'start',
                '&:hover': {
                  backgroundColor: '#B22824',
                  color: 'white',
                },
              }}
            >
              Riwayat Masukkan
            </Button>
          </div>
        </>
      )}
      
    </div>
  );
};

export default SideNavbar;
