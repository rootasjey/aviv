import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import React, { ReactElement, useEffect } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";

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

type HandleUnreadCountProps = {
  index: number
  message: Message
  messagesOverride?: Message[]
  overrideRid?: string
  overrideUnreadCount?: number
}

type LayoutProps = {
  children: ReactElement | ReactElement[]
}

const fetchMessage = async (realtorId: string, messageId: string) => {
  const messagesRes = await fetch(`${BASE_URL}/realtors/${realtorId}/messages/${messageId}`);
  const message: Message = await messagesRes.json();
  return message;
}

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
 * see: https://github.com/vercel/next.js/issues/35822
 */
let _debounce: NodeJS.Timeout;

export default function Layout(props: LayoutProps) {
  const router = useRouter()

  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))
  const isVerySmall = useMediaQuery(theme.breakpoints.between(0, 470))

  const [realtors, setRealtors] = React.useState<Realtor[]>([])
  const [realtorId, setRealtorId] = React.useState<string>('0');
  const [unreadCount, setUnreadCount] = React.useState<number>(0);
  const [selectedMessageIndex, setSelectedMessageIndex] = React.useState<number>(-1);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = React.useState<Message>();

  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);

  const onRailtorChanged = async (newRealtorId: string, initialMessageId?: string) => {
    const realtor = await fetchRealtor(newRealtorId)
    const messages = await fetchMessages(newRealtorId, 1)

    if (realtors.length === 0) {
      const realtors = await fetchRealtors()
      setRealtors(realtors)
    }

    setRealtorId(newRealtorId)
    setMessages(messages ?? [])
    setUnreadCount(realtor.unread_messages)
    
    if (typeof initialMessageId !== 'string') {
      setLoading(false)
      return
    }

    fetchMessage(newRealtorId, initialMessageId)
    .then((messageResp: Message) => {
      if (!messageResp) { return }
      
      setSelectedMessage(messageResp)

      const index = messages.findIndex((message) => message.id == initialMessageId)
      setSelectedMessageIndex(index)

      handleUnreadCount({ 
        index, 
        message: messageResp, 
        messagesOverride: messages,
        overrideRid: newRealtorId,
        overrideUnreadCount: realtor.unread_messages,
       })

      setLoading(false)
    })
  }
  
  const loadMore = async () => {
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

  const handleUnreadCount = ({ 
    index, 
    message, 
    messagesOverride, 
    overrideRid, 
    overrideUnreadCount, 
  }: HandleUnreadCountProps) => {
    if (message.read) { return }

    const count = overrideUnreadCount ?? unreadCount
    
    setUnreadCount(count - 1)
    
    if (index > -1) {
      const availableMessages = messagesOverride ?? messages
      availableMessages[index].read = true
      setMessages(availableMessages)
    }
    
    const rid = overrideRid ?? realtorId ?? 0
    if (rid === '0') { return }

    fetch(`${BASE_URL}/realtors/${rid}/messages/${message.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        read: true,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }

  const markUnread = () => {
    if (typeof selectedMessage === 'undefined') { return }

    fetch(`${BASE_URL}/realtors/${realtorId}/messages/${selectedMessage.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        read: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    
    if (selectedMessageIndex < 0) { return }
    messages[selectedMessageIndex].read = false
    setUnreadCount(unreadCount + 1)
    setMessages(messages)
  }

  const onBack = () => {
    setSelectedMessage(undefined)
    setSelectedMessageIndex(-1)
    window.history.pushState({}, '', `/realtors/${realtorId}`)
  }

  const onSelectedMessageChanged = (message: Message, index: number) => {
    setSelectedMessage(message)
    setSelectedMessageIndex(index)
    handleUnreadCount({ message, index })
    window.history.pushState({}, '', `/realtors/${realtorId}/messages/${message.id}`)
  }

  const noMessageSelected: boolean = typeof selectedMessage === 'undefined'
  
  const messageDrawer = (
    <MessageDrawer 
      loading={loading}
      messages={messages}
      loadMore={loadMore}
      hasNextPage={hasNextPage}
      hidden={isMobileSize && !noMessageSelected}
      isMobileSize={isMobileSize}
      onSelectedMessageChanged={onSelectedMessageChanged}
    />
  )

  const mainAppBar = (
    <MainAppBar 
      isVerySmall={isVerySmall}
      onRailtorChanged={onRailtorChanged}
      realtors={realtors} 
      selectedRealtorId={realtorId}
      unreadCount={unreadCount}
    />
  )

  const messageDetails = (
    <MessageDetails 
      hidden={isMobileSize && noMessageSelected}
      isMobileSize={isMobileSize}
      markUnread={markUnread}
      onBack={onBack}
      selectedMessage={selectedMessage}
    />
  )
  
  useEffect(() => {
    const { rid, mid } = router.query
    if (typeof rid !== 'string') {
      return
    }

    const initialMessageId = typeof mid === 'string' ? mid : undefined

    clearTimeout(_debounce)
    onRailtorChanged(rid, initialMessageId)
  }, [router.query.rid, router.query.mid])

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