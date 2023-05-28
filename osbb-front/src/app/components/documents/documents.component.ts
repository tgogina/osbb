import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddDocumentModalComponent} from '../add-document-modal/add-document-modal.component';
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {takeUntil} from "rxjs/operators";

interface Documents {
  statutoryDocuments: Document[];
  minutesCoOwnersMeetings: Document[];
  minutesBoardMeetings: Document[];
  financialReports: Document[];
}

interface Document {
  title: string,
  file: string // link / base 64 / file
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  readonly lawDocumentLinks: { title: string, link: string }[] = [
    {
      title: 'Закон України "Про обʼєднання співвласників багатоквартирних будинків"',
      link: 'https://zakon.rada.gov.ua/laws/show/2866-14#Text'
    },
    {
      title: 'Закон України "Про житолово комунальні послуги"',
      link: 'https://zakon.rada.gov.ua/laws/show/2189-19#Text'
    }
  ]

  documents: Documents = {
    statutoryDocuments: [],
    minutesCoOwnersMeetings: [],
    minutesBoardMeetings: [],
    financialReports: [],
  }

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      if (!!user) {
        this.getFiles();
      } else {
        this.documents = {
          statutoryDocuments: [],
          minutesCoOwnersMeetings: [],
          minutesBoardMeetings: [],
          financialReports: [],
        }
      }
    });

    this.getFiles();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  downloadFile(): void {
  }

  addDocument(): void {
    const dialogRef = this.dialog.open(AddDocumentModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if (res) {
        this.getFiles();
      }
    })
  }

  private getFiles(): void {

  }
}
