import React from "react";
import clsx from "clsx";
import {Loading} from "../Loading";

type Props = {
  total: number | 'loading'
}

export const Read = (props: Props) => {
  const {total} = props
  return (
    <div className={clsx('border border-gray-300 rounded flex items-center justify-center')}
         title={'阅读量'}
    >
      <div className={'p-1 font-sans transition duration-300 border-r'}>
        阅读
      </div>
      <div className={'pl-2 pr-2 py-1'}>
        {total === 'loading' ? <Loading className={'h-4'}/> : total}
      </div>
    </div>
  )
}