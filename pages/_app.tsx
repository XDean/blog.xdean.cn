import {AppProps} from "next/dist/pages/_app";
import '../styles/global.css'
import Head from 'next/head'
import {Layout} from "../src/components/layout/Layout";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>XDean NextJS Template</title>
      </Head>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </>
  )
}

export default MyApp
