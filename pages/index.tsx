import {GetStaticProps} from 'next'
import {PostMeta} from "src/domain";
import {getPostByPage} from "src/service";
import {Page} from 'common/util/page'
import {PostPageView} from "../src/components/page/PostPageView";
import {NextSeo} from "next-seo";

type Props = {
  data: Page<PostMeta>
}

export default function View(props: Props) {
  return (
    <>
      <NextSeo
        title={'首页'}
        openGraph={{
          title: 'XDean的博客',
          type: 'website',
          images: [{
            url: '/icons/192.webp',
            width: 192,
            height: 192,
          }]
        }}
      />
      <PostPageView page={props.data}/>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  console.log(1, new Date())
  const data = await getPostByPage(1)
  console.log(2, new Date())
  return {
    props: {
      data
    }
  }
}