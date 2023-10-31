import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, combineLatest, takeUntil, tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../actions/auth.actions';
import { AppState, selectAuthStatus, selectAuthUser } from '../selectors/auth.selector';

@Component({
  selector: 'app-account-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './account-profile-page.component.html',
  styleUrls: ['./account-profile-page.component.css']
})
export class AccountProfilePageComponent implements OnInit, OnDestroy {
  private router: Router = inject(Router);
  private destroyed$: Subject<boolean> = new Subject();
  private store: Store<AppState> = inject(Store);

  authUser$ = this.store.select(selectAuthUser);
  authStatus$ = this.store.select(selectAuthStatus);

  ngOnInit(): void {
    const logoutResult$ = combineLatest([
      this.authUser$,
      this.authStatus$
    ]);

    logoutResult$.pipe(
      takeUntil(this.destroyed$),
      tap(([user, status]) => {
        if (status !== 'loading' && !user) { // the user has logged out
          this.router.navigate(['/account'], {
            queryParams: {
              hasLoggedOut: true
            }
          })
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  logout() {
    this.store.dispatch(logout());
  }
}
