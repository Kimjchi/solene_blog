import React, { useEffect, useState } from 'react'
import Layout from '../components/templates/Layout'
import Script from 'next/script'
import Head from 'next/head'

import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return( 
  <Layout>
    <Head>
        <title>Obangsaek</title>
        <meta property="og:title" content="Obangsaek" key="title" />
      </Head>
    <Component {...pageProps} />
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-DLBSFM325M"></Script>
    <Script id="google-analytics" strategy="afterInteractive">
    {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-DLBSFM325M');
    `}
    </Script>
  </Layout>
  )
}

export default MyApp
