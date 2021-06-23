import 'styles/globals.css'
import { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'
import GlobalStyles from 'styles/GlobalStyles'
import theme from 'styles/theme'
import { AuthProvider } from 'contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Days Of Code ~</title>
        <meta name="description" content="Days of Code ~" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </Fragment>
  )
}

export default MyApp
