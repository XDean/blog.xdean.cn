import {PropsWithChildren} from "react";
import {PostMeta} from "../../domain";
import {PostHeader} from "./PostHeader";

type Props = PropsWithChildren<{
  meta: PostMeta
}>

export const PostView = (props: Props) => {
  const {children, meta} = props
  return (
    <div className={'w-full max-w-screen-lg mx-auto'}>
      <PostHeader meta={meta}/>
      <article className={'markdown-body'}>
        {children}
      </article>
    </div>
  )
}