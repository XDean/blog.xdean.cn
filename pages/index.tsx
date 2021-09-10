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
      />
      <PostPageView page={props.data}/>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getPostByPage(1)
  return {
    props: {
      data
    }
  }
}