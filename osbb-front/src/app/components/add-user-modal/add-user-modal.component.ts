import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {takeUntil} from 'rxjs/operators';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnDestroy {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
    property: new FormControl('', Validators.required),
    propertyId: new FormControl('', Validators.required),
    registrationInfo: new FormControl(''),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public readonly dialogRef: MatDialogRef<AddUserModalComponent>,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.userService.addUser(this.userForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.dialogRef.close(true)
        this.notificationService.openSnackBar('Користувач був успішно доданий!');
      });
  }
}
