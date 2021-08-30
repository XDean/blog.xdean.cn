import Link from "next/link";
import React from "react";
import {PostMeta} from "../../domain";
import {Utterances} from 'utterances-react-component'
import {CONSTANT} from "../../constants";

type Props = {
  meta: PostMeta
}
export const PostFooter = (props: Props) => {
  const {meta} = props
  return (
    <div>
      <div className={'flex flex-col text-lg space-y-2'}>
        {meta.prevMeta && (
          <Link href={`/posts/${meta.prevMeta.link}`}>
            <a className={'link'}>
              上一篇: {meta.prevMeta.title}
            </a>
          </Link>
        )}
        {meta.nextMeta && (
          <Link href={`/posts/${meta.nextMeta.link}`}>
            <a className={'link'}>
              下一篇: {meta.nextMeta.title}
            </a>
          </Link>
        )}
      </div>
      <div id={'comment'}>
        <Utterances repo={CONSTANT.commentRepo as `${string}/${string}`}
                    issueTerm={'pathname'}
                    theme={'github-light'}
        />
      </div>
    </div>
  )
}