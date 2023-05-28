import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {AddUserModalComponent} from '../add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  usersDisplayColumns: string[] = ['user', 'email', 'property', 'propertyId', 'registrationInfo', 'action'];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly http: HttpClient, private readonly dialog: MatDialog) {
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

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.getUsers();
    })
  }

  deleteUser(user: User): void {

  }

  private getUsers(): void {
    this.users = [{
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
    }, {
      id: 1,
      name: 'Bla',
      lastName: 'Bla',
      surName: 'Bla',
      property: null,
      propertyId: null,
      registrationInfo: null,
      isAdmin: true,
      email: 'bla@admin.com',
      password: '1111'
    }, {
      id: 1,
      name: 'Qwe',
      lastName: 'Qwe',
      surName: 'Qwe',
      property: null,
      propertyId: null,
      registrationInfo: null,
      isAdmin: true,
      email: 'admin@admin.com',
      password: '1111'
    }]
  }
}
