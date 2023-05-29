import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {takeUntil} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {NotificationService} from '../../services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {AddAdvertisementModalComponent} from '../add-advertisement-modal/add-advertisement-modal.component';
import {UserService} from '../../services/user.service';

interface Advertisement {
  id: number,
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
  isCurrentUserAdmin: boolean;

  private readonly apiUrl = environment.apiUrl;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly http: HttpClient,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog,
    private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.isCurrentUserAdmin = user?.isAdmin;
    });

    this.getAdvertisements();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  deleteAdvertisements(advertisement: Advertisement): void {
    this.http.delete(`${this.apiUrl}api/Announcements/delete/${advertisement.id}`).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.getAdvertisements();
      this.notificationService.openSnackBar('Оголошення успішно видалено!');
    })
  }

  addAdvertisement(): void {
    const dialogRef = this.dialog.open(AddAdvertisementModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if (res) {
        this.getAdvertisements();
        this.notificationService.openSnackBar('Нове оголошення успішно стврено!')
      }
    })
  }

  private getAdvertisements(): void {
    this.http.get<Advertisement[]>(`${this.apiUrl}api/Announcements/get`).pipe(takeUntil(this.unsubscribe$)).subscribe(ads => {
      this.advertisements = ads.reverse();
    })
  }
}
