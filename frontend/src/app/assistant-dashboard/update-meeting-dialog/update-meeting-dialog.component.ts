import { Component, OnInit, Inject } from '@angular/core';
import { Meeting } from '../../models/metting';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-meeting-dialog',
  templateUrl: './update-meeting-dialog.component.html',
  styleUrls: ['./update-meeting-dialog.component.css']
})
export class UpdateMeetingDialogComponent implements OnInit {

  meeting: Meeting;

  constructor(
    public dialogRef: MatDialogRef<UpdateMeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  
  ) { }

  ngOnInit() {
    this.meeting = this.data.meeting;
  }

  getDate(datePicker: any) {
    this.meeting.date = datePicker.value;
  }

}
