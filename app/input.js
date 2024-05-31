import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Username" variant="outlined" InputProps={{ 
          sx: { 
            height: '2.5rem', // menyesuaikan tinggi input
            ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {position : 'fixed'}, 
          }}}
      />
      <TextField id="outlined-basic" label="Password" variant="outlined" InputProps={{ 
          sx: { 
            height: '2.5rem', // menyesuaikan tinggi input
            ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {position : 'fixed'},          
          }}}
      />
    </Box>
  );
}
