import {format} from 'date-fns'
import Link from 'next/link';
import React from "react";
import {PostMeta} from "src/domain";
import {Tag} from "common/components/Tag";
import Image from "common/components/Image";
import clsx from "clsx";

type Props = {
  meta: PostMeta
}

export const PostCard = (props: Props) => {
  const {meta} = props
  return (
    <div
      className={clsx(
        'w-full m-2 transition duration-300 transform subpixel-antialiased',
        'group rounded border border-gray-300 flex flex-row',
        'hover:ring hover:shadow-lg hover:translate-x-2')}>
      <div className={'flex flex-col w-8/12 flex-grow p-2 md:p-4'}>
        <div className={'text-xl md:text-3xl group-hover:underline'}>
          <Link href={`/posts/${meta.link}`}>
            <a>
              {meta.title}
            </a>
          </Link>
        </div>
        <div className={'mt-1 md:mt-2 space-x-1'}>
          <div className={'inline-block whitespace-nowrap'}>
            {format(meta.date, 'yyyy-MM-dd')}
          </div>
          {meta.categories.map(tag => <Tag key={tag} text={tag}/>)}
          {meta.tags.map(tag => <Tag key={tag} text={tag}/>)}
        </div>
        {meta.summary && (
          <div className={'hidden md:block mt-1 md:mt-2'}>
            {meta.summary}
          </div>
        )}
      </div>
      {meta.image && (
        <div className={'w-4/12 items-center justify-center hidden md:flex overflow-hidden'}>
          <Image src={meta.image}
                 className={'w-full h-full relative'}
                 maxWidth={'100%'}
                 width={'100%'}
                 objectFit={'contain'}
                 layout={'fill'}
          />
        </div>
      )}
    </div>
  )
}