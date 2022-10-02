import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import MainAppBar from './MainAppBar';
import MessageDrawer from './MessageDrawer';
import MessageDetails from './MessageDetails';

type ComponentProps = {
  messages: Message[]
  selectedMessage: Message | undefined
  realtors: Realtor[]
}

export default function MainContent(props: ComponentProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MainAppBar realtors={props.realtors} />
      <MessageDrawer messages={props.messages} />
      <MessageDetails selectedMessage={props.selectedMessage} />
    </Box>
  );
}

