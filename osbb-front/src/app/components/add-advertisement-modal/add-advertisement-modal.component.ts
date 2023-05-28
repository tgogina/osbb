import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-add-advertisement-modal',
  templateUrl: './add-advertisement-modal.component.html',
  styleUrls: ['./add-advertisement-modal.component.scss']
})
export class AddAdvertisementModalComponent implements OnDestroy {
  advertisementForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required)
  })

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public readonly dialogRef: MatDialogRef<AddAdvertisementModalComponent>,
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

  }
}
