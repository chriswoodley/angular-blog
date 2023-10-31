import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { authReducer } from './reducers/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
        authInterceptor
    ])),
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer }),
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25, trace: true, logOnly: !isDevMode() })
]
};
