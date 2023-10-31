import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../auth-user';
import { CredentialModel } from '../models/credential-model';

export const login = createAction(
  '[Account Page] Login',
  props<{credentials: CredentialModel}>()
);

export const loginSuccess = createAction(
  '[Account Page] Login Success',
  props<{user: AuthUser}>()
);

export const loginError = createAction(
  '[Account Page] Login Error',
  props<{error: any}>()
);

export const logout = createAction(
  '[Account Profile Page] Logout'
);

export const logoutSuccess = createAction(
  '[Account Profile Page] Logout Success'
);

export const addAuthUser = createAction(
  '[Account Page] Add Auth User',
  props<{user: AuthUser}>()
);
