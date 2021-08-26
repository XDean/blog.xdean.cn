import {format} from "date-fns";
import {Tag} from "common/components/Tag";
import React, {useCallback, useEffect, useState} from "react";
import {PostMeta} from "src/domain";
import useSWR from "swr";
import {Like} from "../../../common/components/Like";

export type Props = {
  meta: PostMeta
}

type LikeState = {
  total: number
  you: number
}

export const PostHeader = ({meta}: Props) => {
  const remoteLike = useSWR<LikeState>(`/api/like?postId=${meta.path}`)
  const [like, setLike] = useState<LikeState>()

  useEffect(() => setLike(remoteLike.data), [remoteLike.data])

  const onLike = useCallback(() => {
    setLike(l => l === undefined ? {total: 1, you: 1} : ({
      total: l.you ? l.total - 1 : l.total + 1,
      you: 1 - l.you,
    }))
    fetch(`/api/like?postId=${meta.path}&value=${(remoteLike.data?.you || 0) === 0}`, {
      method: 'POST'
    })
      .then(() => remoteLike.mutate())
  }, [remoteLike, meta])

  return (
    <div id={'title'}>
      <div>
        <div className={'inline-block text-2xl md:text-4xl'}>
          {meta.title}
        </div>
        {like && (
          <div className={'inline-block ml-2'}>
            <Like total={like.total} like={like.you > 0} onLike={onLike}/>
          </div>
        )}
      </div>
      <div className={'mt-2 ml-0.5 flex items-center space-x-1'}>
        <div>
          {format(meta.date, 'yyyy-MM-dd')}
        </div>
        {meta.categories.map(c => <Tag key={c} text={c}/>)}
        {meta.tags.map(c => <Tag key={c} text={c}/>)}
      </div>
    </div>
  )
}