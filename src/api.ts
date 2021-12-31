import useSWR from 'swr';
import {Like as LikeState, Read as ReadState} from '../common/api/impl/domain';
import {fetchJsonApi} from '../common/util/fetch';
import {PostMeta} from './domain';

export function usePostRead(meta: PostMeta, add: boolean = true) {
  return useSWR<ReadState>(`/api/read?postId=${meta.path}&add=${add}`, fetchJsonApi);
}

export function usePostLike(meta: PostMeta) {
  return useSWR<LikeState>(`/api/like?postId=${meta.path}`, fetchJsonApi);
}

export function likePost(meta: PostMeta, like: boolean) {
  return fetch(`/api/like?postId=${meta.path}&value=${like}`, {
    method: 'POST',
  });
}