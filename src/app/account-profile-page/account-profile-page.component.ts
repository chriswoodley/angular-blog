import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

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
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  private destroyed$: Subject<boolean> = new Subject();

  user$!: Observable<User|undefined>;
  loggedOut$!: Observable<boolean>;

  ngOnInit(): void {
    const authUser = this.authService.authUser;

    if (authUser?.id) {
      this.user$ = this.userService.getUser(authUser.id);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  logout() {
    this.loggedOut$ = this.authService.logout();

    this.loggedOut$
      .pipe(
        takeUntil(this.destroyed$),
        tap((hasLoggedOut) => {
          if (hasLoggedOut) {
            this.router.navigate(['/account'], {
              queryParams: {
                hasLoggedOut: true
              }
            })
          }
        })
      )
      .subscribe();
  }
}
