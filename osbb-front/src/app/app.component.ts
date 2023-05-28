import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {User, UserService} from './services/user.service';
import {NotificationService} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentPath: string;
  user: User;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.currentPath = this.router.url;

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => (this.currentPath = this.router.url));

    this.userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => this.user = user);
    this.userService.checkUser();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  goToUsers(): void {
    this.router.navigate(['users']);
  }

  logout(): void {
    this.userService.logout()
    this.notificationService.openSnackBar('Ви успішно вийшли з системи!');
  }
}
