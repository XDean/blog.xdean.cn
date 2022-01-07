import {PostMeta} from "src/domain";
import {Page} from "common/util/page";
import {PostCard} from "./PostCard";
import {Pagination} from "../../../common/components/Pagination";

type Props = {
  page: Page<PostMeta>
}

export const PostPageView = (props: Props) => {
  const {page} = props
  return (
    <div className={'flex flex-col items-center w-full max-w-screen-lg mx-auto px-4 md:px-8'}>
      {page.data.map(e => (
        <PostCard meta={e} key={e.link}/>
      ))}
      <div className={'mt-2'}>
        <Pagination totalPage={page.total} page={page.page - 1} pageLink={p => `/page/${p + 1}`}/>
      </div>
    </div>
  )
}