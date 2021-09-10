import {PropsWithChildren} from "react";
import {PostMeta} from "../../domain";
import {PostHeader} from "./PostHeader";
import {Toc} from "./Toc";
import clsx from "clsx";
import {PostFooter} from "./PostFooter";
import {PostLinks} from "./PostLinks";
import {useRouter} from "next/router";
import {PostPrintView} from "./PostPrintView";
import {NextSeo} from "next-seo";

type Props = PropsWithChildren<{
  meta: PostMeta
}>

export const PostView = (props: Props) => {
  const {children, meta} = props
  const image = meta.image as StaticImageData
  const router = useRouter()
  if (router && router.query.print) {
    return <PostPrintView meta={meta}>{children}</PostPrintView>
  }
  return (
    <div className={'w-full max-w-screen-xl mx-auto px-4'}>
      <NextSeo
        title={meta.title}
        nofollow={true}
        openGraph={{
          title: meta.title,
          type: 'article',
          description: meta.summary,
          article: {
            authors: ['XDean'],
            tags: [...meta.categories, ...meta.tags],
            publishedTime: meta.date.toISOString(),
          },
          images: image && [{
            url: image.src,
            width: image.width,
            height: image.height,
          }]
        }}
      />
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
          <PostLinks meta={meta}/>
        </div>
        <hr className={'mt-6'}/>
        <div className={'mt-4'}>
          <PostFooter meta={meta}/>
        </div>
      </article>
    </div>
  )
}