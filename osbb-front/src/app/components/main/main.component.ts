import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isExtraInfoOpened: boolean = false;

  ownersContributionsDisplayedColumns: string[] = ['name', 'sum', 'reason'];
  ownersContributionsData = [
    {name: 'Утримання будинку (житлова площа)', sum: '8,00 грн. за 1 кв. м', reason: 'Рішення зборів співвласників'},
    {
      name: 'Утримання будинку (нежитлова площа)',
      sum: '10, 0 грн. за 1 кв. м',
      reason: 'Рішення зборів співвласників'
    },
    {name: 'Резервний фонд', sum: '0,50 грн. за 1 кв. м', reason: 'Рішення зборів співвласників'},
  ]

  tariffsDisplayedColumns: string[] = ['name', 'sum', 'reason'];
  tariffsData = [
    {
      name: 'Холодна вода',
      sum: '25,38 грн. за 1 куб. м (в т.ч. 12,036 грн. - водовідведення)',
      reason: 'Рішення Кабінету Міністрів'
    },
    {name: 'Електропостачання', sum: '1,68 грн. за 1 Квт', reason: 'Рішення Кабінету Міністрів'},
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
