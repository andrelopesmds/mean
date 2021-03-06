import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Exam } from '../../models/exam';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { User } from '../../models/user';
import { Patient } from '../../models/patient';
import { ExamResultDialogComponent } from './exam-result-dialog/exam-result-dialog.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  exams: Exam[] = [];

  displayedColumns: string[] = ['doctorName', 'patientName', 'date', 'examType', 'icon-insert-result', 'icon-send-email'];
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
            this.exams.push(exam);
          });
        } else {
          alert('Não há exames cadastrados');
        }
        this.exams.sort(function(a, b) {
          return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        });
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

  confirmationEmailDialog(exam: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Deseja enviar um email à ' + exam.patientName + ' informando o resultado do exame ' + exam.examType + '?',
        buttonLabel: 'Enviar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.response) {
        this.mainService.sendEmail(exam).subscribe(result => {
          if (result) {
            alert('Email enviado com sucesso');
          } else {
            alert('Não foi possível enviar o email. Verifique se o email cadastrado é válido.');
          }
        },
      erro => {
        alert('Não foi possível enviar o email. Verifique se o email cadastrado é válido.');
      });
      }   
    });
  }

}