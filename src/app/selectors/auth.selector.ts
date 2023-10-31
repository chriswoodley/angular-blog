import { createSelector } from '@ngrx/store';
import { AuthUser } from '../auth-user';

export interface AuthState {
  status: string;
  user: AuthUser
}

export interface AppState {
  auth: AuthState;
}

export const selectFeature = (state: AppState) => state.auth;

export const selectAuthUser = createSelector(
  selectFeature,
  (state: AuthState) => state.user
);

export const selectAuthStatus = createSelector(
  selectFeature,
  (state: AuthState) => state.status
);
