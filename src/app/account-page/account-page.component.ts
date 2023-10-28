import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CredentialModel } from '../models/credential-model';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';


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
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  credentialModel: CredentialModel = new CredentialModel();
  loggedOut$!: Observable<boolean>;
  destroy$: Subject<boolean> = new Subject();
  queryParams$!: Observable<Params>;

  ngOnInit(): void {
    this.queryParams$ = this.route.queryParams;
  }

  logout() {
    this.loggedOut$ = this.authService.logout();
  }

  login() {
    this.authService.login(this.credentialModel)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data?.token) { // if we are not not already logged in
          localStorage.setItem('token', data.token);
          this.router.navigate(['/account/profile']);
        } else if (data?.id) { // or we are already logged in
          this.router.navigate(['/account/profile']);
        } else { // login failed
          this.router.navigate(['/account'], {
            queryParams: {
              loginHasFailed: true
            }
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
