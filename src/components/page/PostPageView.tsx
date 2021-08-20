import {PostMeta} from "src/domain";
import {Page} from "common/util/page";
import {PostCard} from "./PostCard";

type Props = {
  data: Page<PostMeta>
}
export const PostPageView = (props: Props) => {
  return (
    <div className={'flex flex-col items-center w-full max-w-screen-lg mx-auto'}>
      {props.data.data.map(e => (
        <PostCard meta={e} key={e.link}/>
      ))}
    </div>
  )
}