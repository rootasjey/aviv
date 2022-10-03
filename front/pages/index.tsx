import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainContent from '../components/MainContent';
import MessageDrawer from '../components/MessageDrawer';
import MainAppBar from '../components/MainAppBar';
import React from 'react';
import MessageDetails from '../components/MessageDetails';

const baseUrl: string = 'http://localhost:8080'
const pageSize: number = 10

const theme = createTheme({
  palette: {
    primary: {
      main: '#5009dc',
    },
  },
});

type ApiProps = {
  messages: Message[]
  realtors: Realtor[]
}

const fetchMessages = async (realtorId: string, page: number) => {
  const messagesRes = await fetch(`${baseUrl}/realtors/${realtorId}/messages/?page=${page}&page_size=${pageSize}`);
  const messages: Message[] = await messagesRes.json();
  return messages ?? [];
}

const Home: NextPage<ApiProps> = (props) => {
  let initialRealtorId = 0;
  let initialUnreadCount = 0;

  const realtors = props.realtors;
  
  if (realtors.length > 0) {
    initialRealtorId = realtors[0].id
    initialUnreadCount = realtors[0].unread_messages
  }

  const [realtorId, setRealtorId] = React.useState(initialRealtorId.toString());
  const [unreadCount, setUnreadCount] = React.useState(initialUnreadCount);
  const [messages, setMessages] = React.useState(props.messages ?? []);
  const [selectedMessage, setSelectedMessage] = React.useState<Message>();

  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  const onRailtorChanged = async (newRealtorId: string) => {
    if (loading) { return }

    setLoading(true)
    const messages = await fetchMessages(newRealtorId, 1)
    setRealtorId(newRealtorId)
    setMessages(messages ?? [])
    setLoading(false)
  }
  
  const loadMore = async (newTempCount: number) => {
    if (loading || !hasNextPage) { 
      return 
    }

    setLoading(true)
    const newPage = page + 1
    const newMessages = await fetchMessages(realtorId, newPage)

    setMessages([...messages, ...newMessages])
    setPage(newPage)
    setLoading(false)
    setHasNextPage(newMessages.length === pageSize)
  }

  const handleUnreadCount = (message: Message, index: number) => {
    if (message.read) { return }

    setUnreadCount(unreadCount - 1)
    messages[index].read = true
    setMessages(messages)

    fetch(`${baseUrl}/realtors/${realtorId}/messages/${message.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        read: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }

  const messageDrawer = (
    <MessageDrawer 
      loading={loading}
      messages={messages}
      loadMore={loadMore}
      hasNextPage={hasNextPage}
      onSelectedMessageChanged={(message: Message, index: number) => {
        setSelectedMessage(message)
        handleUnreadCount(message, index)
      }}
    />
  )

  const mainAppBar = (
    <MainAppBar 
      realtors={props.realtors} 
      onRailtorChanged={onRailtorChanged}
      selectedRealtor={realtorId}
      unreadCount={unreadCount}
    />
  )

  const messageDetails = (
    <MessageDetails 
      selectedMessage={selectedMessage} 
    />
  )

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <Head>
          <title>aviv group</title>
          <meta name="description" content="aviv group" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <main className={styles.main}>
          <MainContent 
            mainAppBar={mainAppBar}
            messageDrawer={messageDrawer} 
            messageDetails={messageDetails}
            {...props} 
          />
        </main>
      </div>
    </ThemeProvider>
  )
}

export async function getServerSideProps() {
  const realtorsRes = await fetch(`${baseUrl}/realtors/?page=1&page_size=${pageSize}`);
  const realtors = await realtorsRes.json();
  const messages = await fetchMessages(realtors[0].id, 1)
  
  return {
    props: {
      locale: "fr",
      messages,
      realtors,
    },
  }
}

export default Home
