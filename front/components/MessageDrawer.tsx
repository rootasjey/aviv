import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";

import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from "./MainAppBar.module.css";
import MessageItem from "./MessageItem";

const drawerWidth = 400;

type ComponentProps = {
  loading: boolean
  messages: Message[],
  onSelectedMessageChanged: Function
  hasNextPage: boolean
  loadMore: Function
}

export default function MessageDrawer({ messages, onSelectedMessageChanged, loadMore, loading, hasNextPage }: ComponentProps) {
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => loadMore(),
    rootMargin: '0px 0px 0px 0px',
  });

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
        <Box sx={{ overflow: 'auto' }} ref={rootRef}>
          <List>
            {messages.map((message, index) => (
              <div key={message.id} className={message.read ? styles.read : styles.unread}>
                <MessageItem message={message} onClick={() => onSelectedMessageChanged(message, index)} />
                <Divider />
              </div>
            ))}
            
            {(loading || hasNextPage) && (
              <ListItem ref={sentryRef}>
                loading...
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
  );
}
