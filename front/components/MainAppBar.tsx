import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FormControl from '@mui/material/FormControl';

import styles from "./MainAppBar.module.css";
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

/**
 * Return a material style for a native input.
 * @param isMobileSize If true, the input will take less space.
 * @returns A component to style our native input.
 */
const getInputStyle = (isMobileSize: boolean) => {
  return styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: isMobileSize ? '4px 26px 4px 12px' : '6px 26px 6px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));
}

type ComponentProps = {
  isVerySmall: boolean
  onRailtorChanged: Function
  realtors: Realtor[]
  selectedRealtor: string
  unreadCount: number
}

export default function MainAppBar({ 
  realtors, 
  onRailtorChanged, 
  selectedRealtor, 
  unreadCount, 
  isVerySmall, 
}: ComponentProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRailtorChanged(event.target.value)
  };
  
  const InputStyle = getInputStyle(isVerySmall)
  
  return (
    <AppBar color='primary' elevation={4} className={styles.appBar} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: isVerySmall ? 16 : 24 }} className={styles.logo}>
          aviv group<span className={styles.accent}>_</span>
        </Typography>
        
        <Button variant="contained" size={isVerySmall ? 'small' : 'medium'} disableElevation className={styles.unreadCount}>
          <EmailOutlinedIcon fontSize={isVerySmall ? 'small' : 'medium'} />
          <Typography fontSize={isVerySmall ? 16 : 18} sx={{ }} className={styles.badge}>{unreadCount}</Typography>
        </Button>

        <FormControl sx={{ m: 1 }} size="small" variant="outlined">
          <NativeSelect
            id="realtor-select"
            defaultValue={selectedRealtor}
            onChange={handleChange}
            input={<InputStyle />}
          >

            {realtors.map((realtor: Realtor, index) => (
              <option key={realtor.id} value={realtor.id}>
                {realtor.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
}
