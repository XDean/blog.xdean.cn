import {AppProps} from "next/dist/pages/_app";
import '../styles/global.css'
import Head from 'next/head'
import {Layout} from "../src/components/layout/Layout";
import {useRouter} from "next/router";
import {useGA} from "../common/util/ga";
import {CONSTANT} from "../src/constants";
import {DefaultSeo} from "next-seo";


function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter()
  useGA(CONSTANT.gaId)
  return (
    <>
      <DefaultSeo
        defaultTitle={'XDean的博客'}
        titleTemplate={'%s | XDean'}
      />
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
