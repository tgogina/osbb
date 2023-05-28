import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  usersDisplayColumns: string[] = ['user', 'email', 'property', 'propertyId', 'registrationInfo', 'action'];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly http: HttpClient, private readonly dialog: MatDialog, private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      if (res) {
        this.getUsers();
      }
    })
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.getUsers());
  }

  private getUsers(): void {
    this.userService.getUsers().pipe(takeUntil(this.unsubscribe$)).subscribe(users => {
      this.users = users;
    });
  }
}
