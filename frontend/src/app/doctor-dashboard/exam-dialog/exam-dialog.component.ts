import { Component, OnInit, Inject } from '@angular/core';
import { Exam } from '../../models/exam';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-exam-dialog',
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.css']
})
export class ExamDialogComponent implements OnInit {

  exam: Exam = new Exam();
  examTypes: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ExamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.listExamTypes();
    this.exam.doctor = this.data.doctor;
    this.exam.patient = this.data.patient;
  }

  listExamTypes()  {
    this.mainService.listExamTypes().subscribe(
      data => {
        if(data.length > 0) {
          data.forEach(examType => {
            this.examTypes.push(examType.name);
          });
          this.exam.examType = this.examTypes[0];
        } else {
          alert('Não há exames cadastrados');
        }
      },
      erro => {
        console.log(erro);
        alert('Houve problema ao listar tipos de exames, entre em contato com o administrador');
      }
    );
  }

}
