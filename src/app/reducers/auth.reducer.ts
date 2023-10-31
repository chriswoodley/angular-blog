import { createReducer, on } from "@ngrx/store";
import * as authActions from '../actions/auth.actions';
import { AuthUser } from "../auth-user";

export interface State {
  status?: string;
  user?: AuthUser;
}

export const initialState: State = {};

export const authReducer = createReducer(
  initialState,
  on(authActions.login, state => ({
    status: 'loading',
  })),
  on(authActions.loginSuccess, (state, {user}) => {
    try {
      const token = localStorage.getItem('token') || user.token;

      if (token) {
        const authUser = JSON.parse(atob(token.split('.')[1]));

        return {
          status: 'loaded',
          user: {
            ...authUser,
            token
          }
        }
      }

      return {}
    } catch(error) {
      return {
        status: 'error',
        error
      };
    }
  }),
  on(authActions.loginError, (state, {error}) => ({
    status: 'error',
    error
  })),
  on(authActions.logout, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(authActions.logoutSuccess, () => ({}))
);
