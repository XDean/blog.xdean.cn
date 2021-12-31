import clsx from 'clsx';
import Image from 'common/components/Image';
import {Tag} from 'common/components/Tag';
import {format} from 'date-fns';
import Link from 'next/link';
import React from 'react';
import {PostMeta} from 'src/domain';
import {usePostLike, usePostRead} from '../../api';

type Props = {
  meta: PostMeta
}

export const PostCard = (props: Props) => {
  const {meta} = props;
  const read = usePostRead(meta, false);
  const like = usePostLike(meta);
  return (
    <div
      className={clsx(
        'w-full m-2 transition duration-300 transform subpixel-antialiased',
        'group rounded border border-gray-300 flex flex-row',
        'hover:ring hover:shadow-lg hover:translate-x-2')}>
      <div className={'flex flex-col w-8/12 flex-grow p-2 md:p-4'}>
        <div>
          <Link href={`/posts/${meta.link}`}>
            <a className={'text-xl md:text-3xl group-hover:underline'}>
              {meta.title}
            </a>
          </Link>
          {read.data && (
            <div className={'inline text-sm md:text-base ml-2 whitespace-nowrap'}>
              {read.data.unique_total} 阅读 {like.data && like.data.total > 0 && `${like.data.total} 喜欢`}
            </div>
          )}
        </div>
        <div className={'mt-1 md:mt-2 space-x-1'}>
          <div className={'inline-block whitespace-nowrap'}>
            {format(new Date(meta.date), 'yyyy-MM-dd')}
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
  );
};