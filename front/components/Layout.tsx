import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { ReactElement, useEffect } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import MainAppBar from "./MainAppBar";
import MainContent from "./MainContent";
import MessageDetails from "./MessageDetails";
import MessageDrawer from "./MessageDrawer";

import styles from './Layout.module.css'

const BASE_URL: string = 'http://localhost:8080'
const PAGE_SIZE: number = 10

const fetchMessages = async (realtorId: string, page: number) => {
  const messagesRes = await fetch(`${BASE_URL}/realtors/${realtorId}/messages/?page=${page}&page_size=${PAGE_SIZE}`);
  const messages: Message[] = await messagesRes.json();
  return messages ?? [];
}

const fetchRealtor = async (realtorId: string): Promise<Realtor> => {
  const res = await fetch(`${BASE_URL}/realtors/${realtorId}`)
  return await res.json()
}

const fetchRealtors = async (): Promise<Realtor[]> => {
  const res = await fetch(`${BASE_URL}/realtors/?page=1&page_size=${PAGE_SIZE}`)
  return await res.json()
}

type LayoutProps = {
  children: ReactElement | ReactElement[]
}

const _theme = createTheme({
  palette: {
    primary: {
      main: '#5009dc',
    },
  },
});

/** 
 * NOTE: Avoid running twice initial page request in Next.JS
 * messing with data intialization according to router.
 * (router doesn't have its correct property & path on 1st run).
 */
let _debounce: NodeJS.Timeout;

export default function Layout(props: LayoutProps) {
  const router = useRouter()
  const { rid } = router.query

  const [realtors, setRealtors] = React.useState<Realtor[]>([])
  const [realtorId, setRealtorId] = React.useState<string>(typeof rid === 'string' ? rid : '0');
  const [unreadCount, setUnreadCount] = React.useState<number>(0);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = React.useState<Message>();

  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  const onRailtorChanged = async (newRealtorId: string) => {
    setLoading(true)
    const realtor = await fetchRealtor(newRealtorId)
    const messages = await fetchMessages(newRealtorId, 1)

    if (realtors.length === 0) {
      const realtors = await fetchRealtors()
      setRealtors(realtors)
    }

    setRealtorId(newRealtorId)
    setMessages(messages ?? [])
    setUnreadCount(realtor.unread_messages)
    setLoading(false)
  }
  
  const loadMore = async (newTempCount: number) => {
    if (loading || !hasNextPage || realtorId === '0') { 
      return 
    }    

    setLoading(true)
    const newPage = page + 1
    const newMessages = await fetchMessages(realtorId, newPage)

    if (Array.isArray(messages) && Array.isArray(newMessages)) {
      setMessages([...messages, ...newMessages])
    }
    setPage(newPage)
    setLoading(false)
    setHasNextPage(newMessages.length === PAGE_SIZE)
  }

  const handleUnreadCount = (message: Message, index: number) => {
    if (message.read) { return }

    setUnreadCount(unreadCount - 1)
    messages[index].read = true
    setMessages(messages)

    fetch(`${BASE_URL}/realtors/${realtorId}/messages/${message.id}`, {
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
      realtors={realtors} 
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

  
  useEffect(() => {
    const newRid = router.query.rid
    if (typeof newRid !== 'string') {
      return
    }

    clearTimeout(_debounce)
    onRailtorChanged(newRid)
  }, [router.query.rid])

  useEffect(() => {
    clearTimeout(_debounce)

    _debounce = setTimeout(() => {
      setLoading(true)

      fetchRealtors()
        .then(async (realtors: Realtor[]) => {
          const firstRealtorId = realtors[0].id.toString()
          const messages = await fetchMessages(firstRealtorId, page)

          setRealtorId(firstRealtorId)
          setMessages(messages)
          setRealtors(realtors)
          setUnreadCount(realtors[0].unread_messages)
          setPage(page + 1)
          setLoading(false)
        })
    }, 300)
  }, [])

  return (
    <ThemeProvider theme={_theme}>
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
            realtors={realtors}
            messages={messages}
            {...props} 
          />
        </main>
      </div>
    </ThemeProvider>
  )
}