'use client'
import { useState, useEffect } from 'react';
import MemberTable from './home/MemberList';
import InfoMember from '../components/karousel';
import BiodataMember from './home/memberPopup';
import {jwtDecode} from 'jwt-decode';
import KomponenPage from '../components/komponen';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.role === 'admin');
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  return (
    <div>
      {isAdmin && <KomponenPage />} 
      {isAdmin && <MemberTable />} 
      {!isAdmin && <BiodataMember />} 
    </div>
  );
};

export default Home;
