import * as React from 'react';
import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

type ComponentProps = {
  messages: Message[]
  realtors: Realtor[]
  messageDrawer: ReactElement
  mainAppBar: ReactElement
  messageDetails: ReactElement
}

export default function MainContent(props: ComponentProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {props.mainAppBar}
      {props.messageDrawer}
      {props.messageDetails}
    </Box>
  );
}

