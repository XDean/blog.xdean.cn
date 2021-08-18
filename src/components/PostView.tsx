import {PropsWithChildren} from "react";
import {PostMeta} from "../domain";

export const PostView = (props: PropsWithChildren<{ meta: PostMeta }>) => {
  const {children} = props
  return (
    <article className={'markdown-body'}>
      {children}
    </article>
  )
}