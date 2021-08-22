import {PostMeta} from "src/domain";
import {Page} from "common/util/page";
import {PostCard} from "./PostCard";
import {Pagination} from "../../../common/components/Pagination";
import Head  from "next/head";

type Props = {
  page: Page<PostMeta>
}
export const PostPageView = (props: Props) => {
  const {page} = props
  return (
    <div className={'flex flex-col items-center w-full max-w-screen-lg mx-auto'}>
      <Head>
        <title>{page.page === 1 ? '首页' : `第${page.page}页`} | XDean的博客</title>
      </Head>
      {page.data.map(e => (
        <PostCard meta={e} key={e.link}/>
      ))}
      <div className={'mt-2'}>
        <Pagination totalPage={page.total} pageLink={p => `/page/${p + 1}`}/>
      </div>
    </div>
  )
}