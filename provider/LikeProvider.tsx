import React, { createContext, useContext, useMemo, useReducer } from 'react';
import {
  ELikeType,
  Result,
  TLikeAction,
  TLikeContext,
  TLikeState,
} from '../@types';
import _ from 'lodash';

const LikeContext = createContext<TLikeContext | null>(null);

const initialLikeState: TLikeState = {
  likes: [],
};

const likeReducer = (state: TLikeState, action: TLikeAction): TLikeState => {
  switch (action.type) {
    case ELikeType.SET_LIKE_ITEM:
      return {
        ...state,
        likes: [...state.likes, action.payload.item],
      };
    case ELikeType.REMOVE_LIKE_ITEM:
      return {
        ...state,
        likes: state.likes.filter(
          (item) => item.id + '' !== action.payload.item
        ),
      };
    case ELikeType.REMOVE_LIKE_ALL_ITEM:
      return {
        ...state,
        likes: [],
      };
    default:
      console.error(`Error: action type error ${action}`);
      return state;
  }
};

export function LikeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(likeReducer, initialLikeState);
  const store = useMemo(() => ({ state, dispatch }), [state]);
  return <LikeContext.Provider value={store}>{children}</LikeContext.Provider>;
}

export const useLikeContext = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('Error: Like Provider Not Found');
  }
  return context;
};

export const createLikeItemAction = (item: Result): TLikeAction => ({
  type: ELikeType.SET_LIKE_ITEM,
  payload: { item },
});

export const createRemoveItemAction = (item: string): TLikeAction => ({
  type: ELikeType.REMOVE_LIKE_ITEM,
  payload: { item },
});

export const createRemoveAllItemAction = (): TLikeAction => ({
  type: ELikeType.REMOVE_LIKE_ALL_ITEM,
});
