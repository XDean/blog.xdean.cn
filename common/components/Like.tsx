import React from "react";
import clsx from "clsx";

type Props = {
  like: boolean
  total: number
  onLike: () => void
}

export const Like = (props: Props) => {
  const {like, total, onLike} = props
  return (
    <div className={clsx('border border-gray-300 rounded flex items-center justify-center',
    )}
         onClick={onLike}
         title={like ? '取消喜欢' : '喜欢'}
    >
      <div className={'p-1 hover:bg-red-100 cursor-pointer transition duration-300 border-r'}>
        {like ? '❤️' : '🤍'}
      </div>
      <div className={'pl-2 pr-2 py-1'}>
        {total}
      </div>
    </div>
  )
}