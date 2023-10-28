import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-account-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './new-account-page.component.html',
  styleUrls: ['./new-account-page.component.css']
})
export class NewAccountPageComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  hasSubmitted: boolean = false;

  signUp(f: NgForm) {
    this.hasSubmitted = true;

    if (f.invalid) {
      return;
    }

    this.userService.createUser(f.value)
      .subscribe(({id} = {}) => {
        if (!!id) {
          this.router.navigate(['account'], {
            queryParams: {
               id
            }
          })
        }

        // clean up subscription
      });
  }
}
