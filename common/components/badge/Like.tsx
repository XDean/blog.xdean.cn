import React from "react";
import {Badge} from "./Badge";

type Props = {
  like?: boolean
  total?: number
  loading?: boolean
  onLike: () => void
}

export const Like = (props: Props) => {
  const {like = false, total = 0, loading, onLike} = props

  return (
    <Badge left={`❤️ ${like ? '已喜欢' : '喜欢'}`}
           right={total}
           loading={loading}
           onLeftClick={onLike}
           tooltip={like ? '取消喜欢' : '喜欢'}/>
  )
}