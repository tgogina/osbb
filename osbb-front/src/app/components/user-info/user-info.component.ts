import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UserService} from "../../services/user.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  user: User;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly userService: UserService, public readonly dialogRef: MatDialogRef<UserInfoComponent>,) {
  }

  ngOnInit(): void {
    this.userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  close(): void {
    this.dialogRef.close();
  }
}
