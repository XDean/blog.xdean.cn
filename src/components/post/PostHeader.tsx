import {Like as LikeState, Read as ReadState} from 'common/api/impl/domain';
import {Comment} from 'common/components/badge/Comment';
import {Like} from 'common/components/badge/Like';
import {Print} from 'common/components/badge/Print';
import {Read} from 'common/components/badge/Read';
import {Tag} from 'common/components/Tag';
import {isSSR} from 'common/util/next';
import {format} from 'date-fns';
import React, {useCallback} from 'react';
import {PostMeta} from 'src/domain';
import useSWR from 'swr';
import {fetchJsonApi} from '../../../common/util/fetch';

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
        {meta.categories.map(c => <Tag key={c} text={c}/>)}
        {meta.tags.map(c => <Tag key={c} text={c}/>)}
      </div>
      <div className={'space-x-2'}>
        <ReadButton postId={meta.path}/>
        <LikeButton postId={meta.path}/>
        <CommentButton/>
        <PrintButton/>
      </div>
    </div>
  );
};

const LikeButton = ({postId}: { postId: string }) => {
  const like = useSWR<LikeState>(`/api/like?postId=${postId}`, fetchJsonApi);
  const onLike = useCallback(() => {
    fetch(`/api/like?postId=${postId}&value=${(like.data?.you || 0) === 0}`, {
      method: 'POST',
    })
      .then(() => like.mutate());
    like.mutate(l => l === undefined ? {total: 1, you: true} : ({
      total: l.you ? l.total - 1 : l.total + 1,
      you: !l.you,
    }), false);
  }, [like, postId]);
  return (
    <Like total={like.data?.total || 0}
          like={!!like.data?.you}
          loading={like.data === undefined}
          onLike={onLike}
    />
  );
};

const ReadButton = ({postId}: { postId: string }) => {
  const read = useSWR<ReadState>(`/api/read?postId=${postId}`, fetchJsonApi);
  return (
    <Read total={<div title={`${read.data?.total}`}>{read.data?.unique_total}</div> || 0}
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