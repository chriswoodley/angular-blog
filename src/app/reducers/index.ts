import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { AuthUser } from '../auth-user';
import { User } from '../user';
import { Post } from '../post';

export interface State {
  posts: {
    byId: Record<number, Record<string, Post>>,
    allIds: number[]
  },
  AuthUserPosts: {
    byId: Record<number, {id: number, userId: number, postId: number}>,
    allIds: number[]
  },
  auth: {
    status: string, // loading, loaded, error
    user: AuthUser
  },
}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
