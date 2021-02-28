import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import { Container } from '../styles/App';

import TabNavigation from '../components/TabNavigation';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          data-ad-client="ca-pub-7175972143334834"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
      </Head>
      <Container>
        <Component {...pageProps} />
        <TabNavigation />
      </Container>
    </>
  );
}

export default MyApp;
