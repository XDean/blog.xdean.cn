import {AppProps} from "next/dist/pages/_app";
import '../styles/global.css'
import Head from 'next/head'
import {useRouter} from "next/router";
import {PostView} from "../src/components/PostView";

function MyApp({Component, pageProps}: AppProps) {

  const router = useRouter()

  return (
    <>
      <Head>
        <title>XDean NextJS Template</title>
      </Head>
      {function () {
        if (router.pathname.startsWith('/posts/')) {
          return (
            <PostView>
              <Component {...pageProps}/>
            </PostView>
          )
        } else {
          return <Component {...pageProps}/>
        }
      }()}
    </>
  )
}

export default MyApp
