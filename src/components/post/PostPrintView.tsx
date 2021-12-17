import React, {PropsWithChildren} from "react";
import {PostMeta} from "../../domain";
import Head from "next/head";
import {PostLinks} from "./PostLinks";
import {format} from "date-fns";

type Props = PropsWithChildren<{
  meta: PostMeta
}>

export const PostPrintView = (props: Props) => {
  const {children, meta} = props
  const href = window && window.location.href.split('?')[0]
  return (
    <div className={'w-full max-w-screen-xl mx-auto px-4'}>
      <Head>
        <title>{meta.title} | XDean的博客</title>
      </Head>
      <div className={'text-2xl mb-4'}>
        原博链接: <a href={href} className={'underline hover:text-blue-800'}>{href}</a>
      </div>
      <div className={'mb-1'}>
        <div className={'inline-block text-2xl md:text-4xl'}>
          {meta.title}
        </div>
        <div className={'inline-block ml-2'}>
          {format(new Date(meta.date), 'yyyy-MM-dd')}
        </div>
      </div>
      <hr/>
      <article className={'markdown-body mt-4'}>
        {children}
        <PostLinks meta={meta}/>
      </article>
    </div>
  )
}