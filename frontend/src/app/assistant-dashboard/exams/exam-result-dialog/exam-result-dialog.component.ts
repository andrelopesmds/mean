import { Component, OnInit, Inject } from '@angular/core';
import { Exam } from '../../../models/exam';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-exam-result-dialog',
  templateUrl: './exam-result-dialog.component.html',
  styleUrls: ['./exam-result-dialog.component.css']
})
export class ExamResultDialogComponent implements OnInit {

  exam: any;

  constructor(
    public dialogRef: MatDialogRef<ExamResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  
  ) { }

  ngOnInit() {
    this.exam = this.data.exam;
  }

}
