import React from "react";
import {ProgressToc} from "common/components/ProgressToc";

export type TocProps = {
  toc: string
}
export const Toc = ({toc}: TocProps) => {
  if (toc.length === 0) {
    return null
  }
  return (
    <div className={'hidden md:block float-left sticky border-r mr-4 pr-4 top-48 min-w-32 max-w-56 break-words'}>
      <a href={'#'} onClick={() => window.scrollTo(0, 0)}>
        目录
      </a>
      <ProgressToc>

      </ProgressToc>
    </div>
  )
}