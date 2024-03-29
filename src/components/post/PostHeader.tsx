import {Comment} from 'common/components/badge/Comment';
import {Like} from 'common/components/badge/Like';
import {Print} from 'common/components/badge/Print';
import {Read} from 'common/components/badge/Read';
import {Tag} from 'common/components/Tag';
import {isSSR} from 'common/util/next';
import {format} from 'date-fns';
import React, {useCallback} from 'react';
import {PostMeta} from 'src/domain';
import {likePost, usePostLike, usePostRead} from '../../api';

export type Props = {
  meta: PostMeta
}

export const PostHeader = ({meta}: Props) => {

  return (
    <div id={'title'} className={'space-y-2'}>
      <div>
        <span className={'text-2xl md:text-4xl'}>
          {meta.title}
        </span>
      </div>
      <div className={'ml-0.5 flex items-center space-x-1'}>
        <div>
          {format(new Date(meta.date), 'yyyy-MM-dd')}
        </div>
        {meta.countWord && (
          <div className={'text-gray-600 text-xs px-1'}>
            {meta.totalWord} 字
          </div>
        )}
        {meta.categories.map(c => <Tag key={c} text={c}/>)}
        {meta.tags.map(c => <Tag key={c} text={c}/>)}
      </div>
      <div className={'space-x-2'}>
        <ReadButton meta={meta}/>
        <LikeButton meta={meta}/>
        <CommentButton/>
        <div className={'hidden md:inline-block'}>
          <PrintButton/>
        </div>
      </div>
    </div>
  );
};

const LikeButton = ({meta}: { meta: PostMeta }) => {
  const like = usePostLike(meta);
  const onLike = useCallback(() => {
    likePost(meta, !(like.data?.you ?? false))
      .then(() => like.mutate());
    like.mutate(l => l === undefined ? {total: 1, you: true} : ({
      total: l.you ? l.total - 1 : l.total + 1,
      you: !l.you,
    }), false);
  }, [like, meta]);
  return (
    <Like total={like.data?.total || 0}
          like={!!like.data?.you}
          loading={like.data === undefined}
          onLike={onLike}
    />
  );
};

const ReadButton = ({meta}: { meta: PostMeta }) => {
  const read = usePostRead(meta);
  return (
    <Read total={<div title={`${read.data?.unique_total}`}>{read.data?.total}</div> || 0}
          loading={read.data === undefined}
    />
  );
};

const PrintButton = () => {
  return (
    <Print url={`${!isSSR() && window.location.href}?layout=false&print=true&_image_loading=eager`}/>
  );
};

const CommentButton = () => {
  return (
    <Comment onGotoComment={() =>
      document.getElementById('comment')?.scrollIntoView()}/>
  );
};