import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-document-modal',
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.scss']
})
export class AddDocumentModalComponent {
  selectedFile: File;
  category: string;

  constructor(public dialogRef: MatDialogRef<AddDocumentModalComponent>) {
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
