import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from "rxjs";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-document-modal',
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.scss']
})
export class AddDocumentModalComponent implements OnDestroy {
  selectedFile: File;
  category: string;
  title: string;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private apiUrl = environment.apiUrl;

  constructor(public dialogRef: MatDialogRef<AddDocumentModalComponent>,
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

      this.title = this.selectedFile.name;

      const fileToUpload = new FormData();

      fileToUpload.append("fileToUpload", this.selectedFile);

      this.httpClient.post(`${this.apiUrl}api/Documents/add/${this.category}`, fileToUpload).subscribe(() => {

      });
    }
  }

  onFileSelected(event: Event): void {
    this.selectedFile = event.target?.['files']?.[0] || null;
  }
}
