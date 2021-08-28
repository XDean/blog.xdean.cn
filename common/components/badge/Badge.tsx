import React, {ReactNode} from "react";
import clsx from "clsx";
import {Loading} from "../Loading";

type Props = {
  left: ReactNode
  right?: ReactNode
  loading?: boolean
  tooltip?: string
  onLeftClick?: () => void
  onRightClick?: () => void
}

export const Badge = (props: Props) => {
  const {left, right, tooltip, loading, onLeftClick, onRightClick} = props
  return (
    <div className={clsx('border border-gray-300 rounded flex items-center justify-center shadow')}
         title={tooltip}
    >
      <div
        className={clsx('p-1 font-sans transition duration-300 border-r',
          onLeftClick && 'cursor-pointer hover:bg-gray-200'
        )}
        onClick={onLeftClick}
      >
        {left}
      </div>
      {(loading || right !== undefined) && (
        <div
          className={clsx('pl-2 pr-2 py-1',
            onRightClick && 'cursor-pointer hover:bg-gray-200'
          )}
          onClick={onRightClick}
        >
          {loading ? <Loading className={'h-4'}/> : right}
        </div>
      )}
    </div>
  )
}