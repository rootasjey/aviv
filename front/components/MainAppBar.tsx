import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import styles from "./MainAppBar.module.css";

type ComponentProps = {
  realtors: Realtor[]
  onRailtorChanged: Function
  selectedRealtor: string
  unreadCount: number
}

export default function MainAppBar({ realtors, onRailtorChanged, selectedRealtor, unreadCount }: ComponentProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onRailtorChanged(event.target.value)
  };
  
  return (
    <AppBar color='primary' elevation={4} className={styles.appBar} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={styles.logo}>
          aviv group<span className={styles.accent}>_</span>
        </Typography>
        
        <Button variant="contained" size="medium" disableElevation className={styles.unreadCount}>
          <EmailOutlinedIcon />
          <span className={styles.badge}>{unreadCount}</span>
        </Button>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Agence</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={selectedRealtor}
            label="Agence"
            onChange={handleChange}
          >

            {realtors.map((realtor: Realtor, index) => (
              <MenuItem key={realtor.id} value={realtor.id}>
                {realtor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
}
