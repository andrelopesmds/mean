import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Exam } from '../../models/exam';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { User } from '../../models/user';
import { Patient } from '../../models/patient';
import { ExamResultDialogComponent } from './exam-result-dialog/exam-result-dialog.component';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  exams: Exam[] = [];

  displayedColumns: string[] = ['doctorName', 'patientName', 'examType', 'date', 'button-insert-result'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    public dialog: MatDialog,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.listExams();
  }

  listExams() {
    this.exams = [];
    this.mainService.listExams().subscribe(
      result => {
        if (result.length > 0) {
          result.forEach(exam => {
            if (!exam.received)
            this.exams.push(exam);
          });
        } else {
          alert('Não há exames cadastrados');
        }
        this.dataSource.data = this.exams;
      },
      erro => {
        console.log(erro);
        alert('Não foi possível obter os exames cadastrados');
      }
    );
  }

  resultDialog(exam: any) {
    const dialogRef = this.dialog.open(ExamResultDialogComponent, {
      data: {
        exam: exam
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mainService.updateExam(result.exam).subscribe(data => {
        this.listExams();
      });
    });
  }

}