import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../models/user';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  user: User;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.user = this.data.user;
  }

}
