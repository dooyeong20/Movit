import { Dispatch } from 'react';

export enum ELikeType {
  'SET_LIKE_ITEM' = 'likes/set',
  'REMOVE_LIKE_ITEM' = 'likes/remove',
  'REMOVE_LIKE_ALL_ITEM' = 'likes/remove_all',
}

export type TLikeContext = {
  state: object;
  dispatch: Dispatch<TLikeAction>;
};

export type TLikeState = {
  likes: string[];
};

export type TLikeAction =
  | { type: ELikeType.SET_LIKE_ITEM; payload: { item: string } }
  | { type: ELikeType.REMOVE_LIKE_ITEM; payload: { item: string } }
  | { type: ELikeType.REMOVE_LIKE_ALL_ITEM };
