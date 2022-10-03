import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";

import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from "./MainAppBar.module.css";
import MessageItem from "./MessageItem";

type ComponentProps = {
  hasNextPage: boolean
  hidden: boolean
  isMobileSize: boolean
  loading: boolean
  loadMore: Function
  messages: Message[],
  onSelectedMessageChanged: Function
}

export default function MessageDrawer({ 
  hasNextPage, 
  hidden,
  isMobileSize,
  loading,
  loadMore, 
  messages, 
  onSelectedMessageChanged, 
}: ComponentProps) {
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => loadMore(),
    rootMargin: '0px 0px 0px 0px',
  });

  if (hidden) {
    return (<div></div>)
  }

  const drawerWidth = isMobileSize ? '100%' : 400
  
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
