import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";


import styles from "./MainAppBar.module.css";
import MessageItem from "./MessageItem";

const drawerWidth = 400;

type ComponentProps = {
  messages: Message[],
}

export default function MessageDrawer({ messages }: ComponentProps) {
  return (
    <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        className={styles.drawer}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {messages.map((message, index) => (
              <div key={message.id} className={message.read ? styles.read : styles.unread}>
                <MessageItem message={message} />
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
  );
}
