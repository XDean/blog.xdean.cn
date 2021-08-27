import {format} from "date-fns";
import {Tag} from "common/components/Tag";
import React, {useCallback} from "react";
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
  const like = useSWR<LikeState>(`/api/like?postId=${meta.path}`)

  const onLike = useCallback(() => {
    like.mutate(l => l === undefined ? {total: 1, you: 1} : ({
      total: l.you ? l.total - 1 : l.total + 1,
      you: 1 - l.you,
    }), false)
    fetch(`/api/like?postId=${meta.path}&value=${(like.data?.you || 0) === 0}`, {
      method: 'POST'
    })
      .then(() => like.mutate())
  }, [like, meta])

  return (
    <div id={'title'}>
      <div>
        <div className={'inline-block text-2xl md:text-4xl'}>
          {meta.title}
        </div>
        {like.data && (
          <div className={'inline-block ml-2'}>
            <Like total={like.data.total} like={like.data.you > 0} onLike={onLike}/>
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