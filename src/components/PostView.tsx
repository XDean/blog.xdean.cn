import {PropsWithChildren} from "react";

export const PostView = (props: PropsWithChildren<{}>) => {
  const {children} = props
  return (
    <article className={'markdown-body'}>
      {children}
    </article>
  )
}