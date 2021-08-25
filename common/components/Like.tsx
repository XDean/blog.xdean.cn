import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as fasHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as farHeart} from "@fortawesome/free-regular-svg-icons";
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
    <div className={clsx('border border-gray-300 rounded-md pl-1 pr-2 flex items-center justify-center',
      'transition duration-300 group hover:bg-red-100 hover:border-transparent hover:shadow cursor-pointer'
    )}
         onClick={onLike}
         title={like ? '取消喜欢' : '喜欢'}
    >
      <FontAwesomeIcon icon={like ? fasHeart : farHeart} className={'text-red-600'}/>
      <div className={'ml-2 font-mono'}>
        {total}
      </div>
    </div>
  )
}