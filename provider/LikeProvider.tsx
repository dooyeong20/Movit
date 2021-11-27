import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { ELikeType, TLikeAction, TLikeContext, TLikeState } from '../@types';

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
        likes: state.likes.filter((item) => item !== action.payload.item),
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
    console.error('Error: No Like Provider');
    return;
  }
  return context;
};
