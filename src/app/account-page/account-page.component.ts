import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CredentialModel } from '../models/credential-model';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, combineLatest, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { login, loginSuccess } from '../actions/auth.actions';
import { selectAuthStatus, selectAuthUser } from '../selectors/auth.selector';


@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnDestroy, OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private destroy$: Subject<boolean> = new Subject();

  authUser$ = this.store.select(selectAuthUser);
  authStatus$ = this.store.select(selectAuthStatus);
  authService = inject(AuthService);
  credentialModel: CredentialModel = new CredentialModel();
  queryParams$!: Observable<Params>;

  ngOnInit(): void {
    this.queryParams$ = this.route.queryParams;

    const loginResult$ = combineLatest([
      this.authUser$,
      this.authStatus$
    ]);

    loginResult$
      .pipe(
        takeUntil(this.destroy$),
        tap(([user, status]) => {
          if (status === 'error') {
            this.router.navigate(['/account'], {
              queryParams: {
                loginHasFailed: true
              }
            });
          }

          if (status === 'loaded' && user.token) {
            localStorage.setItem('token', user.token);
            this.router.navigate(['/account/profile']);
          }
        })
      ).subscribe();

      const authUser = this.authService.authUser;

    // if we have the auth user token on page refresh. pass the user on...
    if (!!authUser) {
      this.store.dispatch(loginSuccess({user: authUser}));
    }
  }

  login() {
    this.store.dispatch(login({credentials: this.credentialModel}));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
