import {PropsWithChildren} from "react";
import {PostMeta} from "../../domain";
import {PostHeader} from "./PostHeader";
import {Toc} from "./Toc";
import Head from "next/head";
import clsx from "clsx";

type Props = PropsWithChildren<{
  meta: PostMeta
}>

export const PostView = (props: Props) => {
  const {children, meta} = props
  return (
    <div className={'w-full max-w-screen-xl mx-auto px-4'}>
      <Head>
        <title>{meta.title} | XDean的博客</title>
      </Head>
      {meta.tocData && (
        <div
          className={clsx('hidden md:block float-left sticky top-32',
            'border-r mr-4 pr-4 min-w-xl max-w-4xl max-h-[80vh] overflow-y-auto',
          'scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-0')}>
          <Toc toc={meta.tocData}/>
        </div>
      )}
      <article className={'overflow-y-hidden'}>
        <div className={'mb-4'}>
          <PostHeader meta={meta}/>
        </div>
        <div className={'markdown-body'}>
          {children}
        </div>
      </article>
    </div>
  )
}