'use client'

import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const MemberDialog = ({ open, onClose, member }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white border border-gray-300 rounded shadow-lg"
      >
        <Typography variant="h6" component="h2">
          Member Details
        </Typography>
        {member && (
          <div className="mt-4">
            <Typography>Name: {member.nama}</Typography>
            <Typography>NIP: {member.nip}</Typography>
            <Typography>Program Studi: {member.program_studi}</Typography>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default MemberDialog;
