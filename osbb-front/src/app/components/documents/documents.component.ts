import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddDocumentModalComponent} from '../add-document-modal/add-document-modal.component';
import {UserService} from '../../services/user.service';
import {NotificationService} from '../../services/notification.service';
import {takeUntil} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

interface Documents {
  statutoryDocuments: DocumentResponse[];
  minutesCoOwnersMeetings: DocumentResponse[];
  minutesBoardMeetings: DocumentResponse[];
  financialReports: DocumentResponse[];
}

interface DocumentResponse {
  category: string;
  content: string;
  id: number;
  name: string;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  private readonly apiUrl = environment.apiUrl;
  readonly lawDocumentLinks: { title: string, link: string }[] = [
    {
      title: 'Закон України "Про обʼєднання співвласників багатоквартирних будинків"',
      link: 'https://zakon.rada.gov.ua/laws/show/2866-14#Text'
    },
    {
      title: 'Закон України "Про житолово комунальні послуги"',
      link: 'https://zakon.rada.gov.ua/laws/show/2189-19#Text'
    }
  ];

  isCurrentUserAdmin: boolean;
  documents: Documents = {
    statutoryDocuments: [],
    minutesCoOwnersMeetings: [],
    minutesBoardMeetings: [],
    financialReports: [],
  };

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      this.isCurrentUserAdmin = user?.isAdmin;

      if (!!user) {
        this.getFiles();
      } else {
        this.documents = {
          statutoryDocuments: [],
          minutesCoOwnersMeetings: [],
          minutesBoardMeetings: [],
          financialReports: [],
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addDocument(): void {
    const dialogRef = this.dialog.open(AddDocumentModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if (res) {
        this.getFiles();
        this.notificationService.openSnackBar('Файл успішно додано!');
      }
    });
  }

  private getFiles(): void {
    this.http.get(`${this.apiUrl}api/Documents/get`)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((files: DocumentResponse[]) => {
          this.documents = {
            statutoryDocuments: [],
            minutesCoOwnersMeetings: [],
            minutesBoardMeetings: [],
            financialReports: [],
          };

          files.forEach(f => {
            this.documents[f.category].push(f);
          });
        }
      );
  }

  downloadFile(doc: DocumentResponse): void {
    this.http.get(`${this.apiUrl}api/Documents/download/${doc.id}`, { responseType: 'blob' })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: Blob) => {
        const blobUrl = URL.createObjectURL(res);
        const link = document.createElement('a');

        link.href = blobUrl;
        link.download = doc.name;
        link.click();

        URL.revokeObjectURL(blobUrl);
      });
  }
}
