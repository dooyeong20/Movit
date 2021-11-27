import { Dispatch } from 'react';

export type TLikeContext = {
  state: object;
  dispatch: Dispatch<TLikeAction>;
};

export type TLikeState = {
  likes: string[];
};

export type TLikeAction =
  | { type: 'LIKES/set'; payload: { item: string } }
  | { type: 'LIKES/remove'; payload: { item: string } }
  | { type: 'LIKES/remove_all' };
