import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Phone} from '../phone-input/phone-input.component';

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

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendRequest(): void {
  }

  private validatePhone(phoneControl: FormControl): ValidationErrors | null {
    const phone: Phone = phoneControl.value;

    if (phone?.area.length !== 2 || phone?.exchange.length !== 3 || phone?.subscriber.length !== 4) {
      return {invalidNumber: true};
    }

    return null;
  }
}
