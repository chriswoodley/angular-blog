import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { CredentialModel } from '../models/credential-model';
import * as authActions from '../actions/auth.actions'

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.login),
    exhaustMap((action) => this.authService.login(action.credentials)
      .pipe(
        map(user => authActions.loginSuccess({ user })),
        catchError((error) => of(authActions.loginError({error})))
      ))
    )
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.logout),
    exhaustMap(() => this.authService.logout().pipe(
      map(() => authActions.logoutSuccess())
    ))
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
