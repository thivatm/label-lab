import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-modal-label',
  templateUrl: './modal-label.component.html',
  styleUrls: ['./modal-label.component.css']
})
export class ModalLabelComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public label: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
