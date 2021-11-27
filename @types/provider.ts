import { Dispatch } from 'react';
import { Result } from '.';

export enum ELikeType {
  'SET_LIKE_ITEM' = 'likes/set',
  'REMOVE_LIKE_ITEM' = 'likes/remove',
  'REMOVE_LIKE_ALL_ITEM' = 'likes/remove_all',
}

export type TLikeState = {
  likes: Result[];
};

export type TLikeContext = {
  state: TLikeState;
  dispatch: Dispatch<TLikeAction>;
};

export type TLikeAction =
  | { type: ELikeType.SET_LIKE_ITEM; payload: { item: Result } }
  | { type: ELikeType.REMOVE_LIKE_ITEM; payload: { item: string } }
  | { type: ELikeType.REMOVE_LIKE_ALL_ITEM };
