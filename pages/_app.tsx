import {AppProps} from 'next/dist/pages/_app';
import '../styles/global.css';
import Head from 'next/head';
import {Layout} from '../src/components/layout/Layout';
import {useRouter} from 'next/router';
import {useGA} from '../common/util/ga';
import {CONSTANT} from '../src/constants';
import {DefaultSeo} from 'next-seo';
import {isDEV} from '../common/util/env';

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  useGA(CONSTANT.gaId);
  return (
    <>
      <DefaultSeo
        defaultTitle={'XDean的博客'}
        titleTemplate={'%s | XDean'}
      />
      <Head>
        <title>XDean NextJS Template</title>
        {!isDEV && <script dangerouslySetInnerHTML={{
          __html: `var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?18ff7e79ef1c492ff64063605453b2f4";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
`,
        }}/>}
      </Head>
      {function () {
        if (router && router.query.layout === 'false') {
          return <Component {...pageProps}/>;
        } else {
          return (
            <Layout>
              <Component {...pageProps}/>
            </Layout>
          );
        }
      }()}
    </>
  );
}

export default MyApp;
