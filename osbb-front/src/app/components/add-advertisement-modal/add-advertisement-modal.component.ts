import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {takeUntil} from 'rxjs/operators';

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

  private readonly apiUrl = environment.apiUrl;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public readonly dialogRef: MatDialogRef<AddAdvertisementModalComponent>,
    private readonly http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.http.post<void>(`${this.apiUrl}api/Announcements/create`, this.advertisementForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.dialogRef.close(true));
  }
}
