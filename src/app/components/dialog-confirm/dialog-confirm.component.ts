import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data:any,private dialogRef:MatDialogRef<DialogConfirmComponent>) { }

  ngOnInit(): void {
  }

  cerrarDialogo(): void { 
    this.dialogRef.close(false);
  }
  confirmado(): void {
    this.dialogRef.close(true);
  }
}
