import 'styles/globals.css'
import Head from 'next/head'
import { Fragment } from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Days Of Code ~</title>
        <meta name="description" content="Days of Code ~" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
