import {Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subject} from "rxjs";

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

  constructor(public dialogRef: MatDialogRef<AddDocumentModalComponent>) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
  }

  onFileSelected(event: Event): void {
    this.selectedFile = event.target?.['files']?.[0] || null;
  }
}
