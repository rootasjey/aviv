import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainContent from '../components/MainContent';


const theme = createTheme({
  palette: {
    primary: {
      main: '#5009dc',
    },
  },
});

type ApiProps = {
  messages: Message[]
  selectedMessage: Message | undefined
  realtors: Realtor[]
}

const Home: NextPage<ApiProps> = (props) => {
  
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
          <MainContent {...props} />
        </main>
      </div>
    </ThemeProvider>
  )
}

export async function getServerSideProps() {
  const realtorsRes = await fetch("http://localhost:8080/realtors/?page=1&page_size=10");
  const realtors = await realtorsRes.json();
  
  const messagesRes = await fetch("http://localhost:8080/realtors/101/messages/?page=1&page_size=10");
  const messages = await messagesRes.json();
  
  return {
    props: {
      locale: "fr",
      // selectedMessage: undefined,
      messages,
      realtors,
    },
  }
}

export default Home
