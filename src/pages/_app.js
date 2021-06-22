import 'styles/globals.css'
import { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'
import theme from 'styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Days Of Code ~</title>
        <meta name="description" content="Days of Code ~" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  )
}

export default MyApp
