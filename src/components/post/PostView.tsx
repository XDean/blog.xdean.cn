import {PropsWithChildren} from "react";
import {PostMeta} from "../../domain";
import {Header} from "./Header";

type Props = PropsWithChildren<{
  meta: PostMeta
}>

export const PostView = (props: Props) => {
  const {children, meta} = props
  return (
    <div>
      <Header meta={meta}/>
      <article className={'markdown-body'}>
        {children}
      </article>
    </div>
  )
}