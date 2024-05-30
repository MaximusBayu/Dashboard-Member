'use client'

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';


const SideNavbar = ({ isAdmin }) => {
  const router = useRouter();
  const adminName = "Admin";

  return (
    <div className="h-screen w-64 bg-white text-gray-700 flex flex-col items-center py-10 rounded-r-lg border border-gray-300 shadow-xl">
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
          onClick={() => router.push('/')}
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
              onClick={() => router.push('/add-member')}
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
              onClick={() => router.push('/history')}
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
      <div className="flex-1"></div>
      <div className='w-full px-8'>
        <Button
          startIcon={<SettingsIcon />}
          onClick={() => router.push('/settings')}
          className="mb-2 pr-20 hover:shadow-lg"
          sx={{
            color: 'grey',
            justifyContent: 'start',
            '&:hover': {
              backgroundColor: '#B22824',
              color: 'white',
            },
          }}
        >
          Settings
        </Button>
      </div>
      <div className='w-full px-8'>
        <Button
          startIcon={<LogoutIcon />}
          onClick={() => router.push('/logout')}
          className="mb-4 pr-24 hover:shadow-lg"
          sx={{
            color: 'grey',
            justifyContent: 'start',
            '&:hover': {
              backgroundColor: '#B22824',
              color: 'white',
            },
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SideNavbar;
