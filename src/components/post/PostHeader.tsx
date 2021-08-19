import {format} from "date-fns";
import {Tag} from "common/components/Tag";
import React from "react";
import {PostMeta} from "src/domain";

export type Props = {
  meta: PostMeta
}

export const PostHeader = ({meta}: Props) => {
  return (
    <div id={'title'}>
      <div className={'text-2xl md:text-4xl'}>
        {meta.title}
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