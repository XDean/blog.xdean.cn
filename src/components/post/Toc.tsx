import React from "react";
import {ProgressToc} from "common/components/ProgressToc";
import {TocItem} from "src/domain";
import clsx from "clsx";

type Props = {
  toc: TocItem[]
  className?: string
}
export const Toc = (props: Props) => {
  const {toc, className} = props
  return (
    <div className={clsx('break-all flex flex-col items-start max-w-[16rem]', className)}>
      <a href={'#'} onClick={() => window.scrollTo(0, 0)}
         className={'text-2xl mb-4 ml-6 hover:underline'}
      >
        目录
      </a>
      <ProgressToc>
        <ul className={'ml-0'}>
          {toc.map((e, i) => (
            <li key={i} style={{marginLeft: (e.level - 2) * 15 + 5}}>
              <a href={`#${e.anchor}`}>
                {e.text}
              </a>
            </li>
          ))}
        </ul>
      </ProgressToc>
    </div>
  )
}