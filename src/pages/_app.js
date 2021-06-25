import 'styles/globals.css'
import { Fragment } from 'react'

import Head from 'next/head'
import GlobalStyles from 'styles/GlobalStyles'

import Navbar from 'templates/Navbar'
import { AuthProvider } from 'contexts/AuthContext'
import { ThemeProvider } from 'contexts/ThemeContext'

function MyApp({ Component, pageProps }) {
  if (!process.browser) return null

  return (
    <Fragment>
      <Head>
        <title>Days Of Code ~</title>
        <meta name="description" content="Days of Code ~" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <GlobalStyles />
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </Fragment>
  )
}

export default MyApp
