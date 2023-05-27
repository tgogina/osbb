import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

interface Article {
  title: string;
  content: any;
  description: string;
  publishedAt: Date;
  author: string;
  source: {
    id: string;
    name: string;
  };
  url: string;
  urlToImage: string;
}

interface WarStatistics {
  date: Date;
  stats: {
    aa_warfare_systems: number;
    armoured_fighting_vehicles: number;
    artillery_systems: number;
    atgm_srbm_systems: number;
    cruise_missiles: number;
    helicopters: number;
    mlrs: number;
    personnel_units: number;
    planes: number;
    special_military_equip: number;
    tanks: number;
    uav_systems: number;
    vehicles_fuel_tanks: number;
    warships_cutters: number;
  }
  increase: {
    aa_warfare_systems: number;
    armoured_fighting_vehicles: number;
    artillery_systems: number;
    atgm_srbm_systems: number;
    cruise_missiles: number;
    helicopters: number;
    mlrs: number;
    personnel_units: number;
    planes: number;
    special_military_equip: number;
    tanks: number;
    uav_systems: number;
    vehicles_fuel_tanks: number;
    warships_cutters: number;
  }
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  warStatistics: WarStatistics;
  news: Article[];

  private readonly apiKey = '973848bfce514097aea51f2625d5e312';
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly http: HttpClient) {
  }

  ngOnInit(): void {
    this.http
      .get(`https://newsapi.org/v2/top-headlines?country=ua&apiKey=${this.apiKey}`,)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: { status: string, articles: Article[] }) => {
        if (res && res.status === 'ok') {
          this.news = res.articles;
        }
      });

    this.http
      .get('https://russianwarship.rip/api/v2/statistics/latest')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: { data: WarStatistics }) => {
        this.warStatistics = res.data;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
