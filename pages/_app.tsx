import {AppProps} from "next/dist/pages/_app";
import '../styles/global.css'
import Head from 'next/head'
import {Layout} from "../src/components/layout/Layout";
import {useRouter} from "next/router";

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>XDean NextJS Template</title>
      </Head>
      {function () {
        if (router && router.query.layout === 'false') {
          return <Component {...pageProps}/>
        } else {
          return (
            <Layout>
              <Component {...pageProps}/>
            </Layout>
          )
        }
      }()}
    </>
  )
}

export default MyApp
