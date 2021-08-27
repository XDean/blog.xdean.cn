import {format} from "date-fns";
import {Tag} from "common/components/Tag";
import React, {useCallback} from "react";
import {PostMeta} from "src/domain";
import useSWR from "swr";
import {Like} from "common/components/badge/Like";
import {Print} from "common/components/badge/Print";
import {Read} from "common/components/badge/Read";
import {isSSR} from "common/util/next";

export type Props = {
  meta: PostMeta
}

type LikeState = {
  total: number
  you: number
}

export const PostHeader = ({meta}: Props) => {

  return (
    <div id={'title'}>
      <div className={'space-x-2'}>
        <span className={'text-2xl md:text-4xl'}>
          {meta.title}
        </span>
        <div className={'inline-block'}>
          <Read total={0} loading={true}/>
        </div>
        <div className={'inline-block'}>
          <LikeButton postId={meta.path}/>
        </div>
        <div className={'inline-block'}>
          <Print url={`${!isSSR() && window.location.href}?layout=false&print=true`}/>
        </div>
      </div>
      <div className={'mt-2 ml-0.5 flex items-center space-x-1'}>
        <div>
          {format(meta.date, 'yyyy-MM-dd')}
        </div>
        {meta.categories.map(c => <Tag key={c} text={c}/>)}
        {meta.tags.map(c => <Tag key={c} text={c}/>)}
      </div>
      <div>
      </div>
    </div>
  )
}

const LikeButton = ({postId}: { postId: string }) => {
  const like = useSWR<LikeState>(`/api/like?postId=${postId}`)
  const onLike = useCallback(() => {
    fetch(`/api/like?postId=${postId}&value=${(like.data?.you || 0) === 0}`, {
      method: 'POST'
    })
      .then(() => like.mutate())
    like.mutate(l => l === undefined ? {total: 1, you: 1} : ({
      total: l.you ? l.total - 1 : l.total + 1,
      you: 1 - l.you,
    }), false)
  }, [like, postId])
  return (
    <Like total={like.data?.total}
          like={!!like.data?.you}
          loading={like.data === undefined}
          onLike={onLike}
    />
  )
}