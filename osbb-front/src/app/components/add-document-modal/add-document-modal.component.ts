import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {environment} from 'src/environments/environment';
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-add-document-modal',
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.scss']
})
export class AddDocumentModalComponent implements OnDestroy {
  selectedFile: File;
  category: string;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private apiUrl = environment.apiUrl;

  constructor(
    public dialogRef: MatDialogRef<AddDocumentModalComponent>,
    private readonly httpClient: HttpClient) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.selectedFile) {
      const fileToUpload = new FormData();

      fileToUpload.append('fileToUpload', this.selectedFile);

      this.httpClient.post(`${this.apiUrl}api/Documents/add/${this.category}`, fileToUpload)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }

  onFileSelected(event: Event): void {
    this.selectedFile = event.target?.['files']?.[0] || null;
  }
}
