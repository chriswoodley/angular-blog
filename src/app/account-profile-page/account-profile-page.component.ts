import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

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
export class AccountProfilePageComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  user$!: Observable<User|undefined>;

  ngOnInit() {
    const authUser = this.authService.authUser;

    if (authUser?.id) {
      this.user$ = this.userService.getUser(authUser.id);
    }
  }
}
