import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  hidePassword: boolean = true;

  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly router: Router, private readonly userService: UserService) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goHome(): void {
    this.router.navigate(['main']);
  }

  login(): void {
    const dummyUser = {
      id: 1,
      name: 'Admin',
      lastName: 'Admin',
      surName: 'Admin',
      property: null,
      propertyId: null,
      registrationInfo: null,
      isAdmin: true,
      email: 'admin@admin.com',
      password: '1111'
    }

    this.userService.setUser(dummyUser);
    this.router.navigate(['main']);
  }
}
