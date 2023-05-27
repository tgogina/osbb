import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

interface Advertisement {
  title: string,
  text: string
}

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit, OnDestroy {
  advertisements: Advertisement[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.advertisements = [
      {
        title: 'Збори у березні',
        text: `УВАГА!\n\n03 березня 2023 року, середа о 20:00\nПОЗАПЛАНОВІ\nЗагальні збори власників будинку ОСББ\n\nПитання:\n1. Кошторис 2023\n2. Правління ОСББ та посада голови правління\n3. Тарифи на 2023`
      },
      {
        title: 'Вчасні виплати',
        text: 'Шановні співвласники! Утримання нашого будинку і приведення його в належний санітарний і технічний стан вимагає постійних витрат. Основне джерело коштів на проведення всіх неоюхідних робіт - це внески співввласникві будинку. Правління звертається до Вас з проханням своєчасно сплачувати внески і не допускати заборгованості. Щиро сподіваємося на Ваше розуміння.'
      },
    ]
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
