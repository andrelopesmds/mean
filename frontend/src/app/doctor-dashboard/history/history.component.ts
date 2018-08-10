import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Exam } from '../../models/exam';
import { MatTableDataSource } from '@angular/material';
import { MainService } from '../../main.service';
import { Patient } from '../../models/patient';
import { History } from '../../models/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @Input() patient: Patient;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  exams = [];
  prescriptions = [];
  history: History[] = [];
  displayedColumns: string[] = ['doctorName', 'date', 'prescriptionOrRquest', 'result'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.listExams(changes.patient.currentValue.cpf);
    this.listPrescription(changes.patient.currentValue.cpf);
  }

  makeDataSource() {
    let dataSource = [];
    if(this.exams.length > 0) {
      this.exams.forEach(exam => {
        let temp = new History();
        temp.doctorName = exam.doctorName;
        temp.date = exam.date;
        temp.prescriptionOrRequest = exam.examType;
        temp.result = exam.result;
        dataSource.push(temp);
      });
    }
    if(this.prescriptions.length > 0) {
      this.prescriptions.forEach(prescription => {
        let temp = new History();
        temp.doctorName = prescription.doctorName;
        temp.date = prescription.date;
        temp.prescriptionOrRequest = prescription.genericName;
        temp.result = '-';
        dataSource.push(temp);
      });
    }
    this.dataSource.data = dataSource;
  }

  listExams(cpf: number) {
    this.exams = [];
    this.mainService.listExams().subscribe(
      result => {
        if (result.length > 0) {
          result.forEach(exam => {
            if (exam.patientCpf == cpf) {
              this.exams.push(exam);
            }
          });
        } else {
          alert('Não há exames cadastrados');
        }
        this.makeDataSource();
      },
      erro => {
        console.log(erro);
        alert('Não foi possível obter os exames cadastrados');
      }
    );
  }

  listPrescription(cpf: number) {
    this.prescriptions = [];
    this.mainService.listPrescriptions().subscribe(
      result => {
        if(result.length > 0) {
          result.forEach(prescription => {
            if(prescription.patientCpf == cpf) {
              this.prescriptions.push(prescription);
            }
          });
        }
        this.makeDataSource();
    });
  }

  closeHistory() {
    this.close.emit(true);
  }

}
