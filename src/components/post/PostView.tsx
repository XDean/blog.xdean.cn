import {PropsWithChildren} from "react";
import {PostMeta} from "../../domain";
import {PostHeader} from "./PostHeader";
import {Toc} from "./Toc";

type Props = PropsWithChildren<{
  meta: PostMeta
}>

export const PostView = (props: Props) => {
  const {children, meta} = props
  return (
    <div className={'w-full max-w-screen-xl mx-auto px-4'}>
      {meta.tocData && (
        <Toc toc={meta.tocData}
             className={'hidden md:block float-left sticky border-r mr-4 pr-4 top-48 min-w-32 max-w-56'}
        />
      )}
      <article className={'overflow-y-hidden'}>
        <div className={'sticky top-0'}>
          <PostHeader meta={meta}/>
        </div>
        <div className={'markdown-body'}>
          {children}
        </div>
      </article>
    </div>
  )
}