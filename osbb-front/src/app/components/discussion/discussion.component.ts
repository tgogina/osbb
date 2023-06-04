import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Phone} from '../phone-input/phone-input.component';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';
import {environment} from '../../../environments/environment';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnDestroy {
  form: FormGroup = new FormGroup({
    phone: new FormControl(new Phone('', '', ''), this.validatePhone),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    flatNumber: new FormControl('', [Validators.required]),
  });

  private readonly apiUrl = environment.apiUrl;
  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly http: HttpClient, private readonly notificationService: NotificationService) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendRequest(): void {
    const {phone, name, email, flatNumber} = this.form.value;

    this.http.post(`${this.apiUrl}api/User/subscribe`, {
      name,
      email,
      property: flatNumber,
      phone: +`${phone.area}${phone.exchange}${phone.subscriber}`
    })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.notificationService.openSnackBar('Запит на додавання надіслано адміністратору!'));
  }

  private validatePhone(phoneControl: FormControl): ValidationErrors | null {
    const phone: Phone = phoneControl.value;

    if (phone?.area.length !== 2 || phone?.exchange.length !== 3 || phone?.subscriber.length !== 4) {
      return {invalidNumber: true};
    }

    return null;
  }
}
