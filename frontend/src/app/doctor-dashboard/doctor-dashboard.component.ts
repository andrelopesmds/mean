import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../models/patient';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MainService } from '../main.service';
import { User } from '../models/user';
import { PrescriptionDialogComponent } from './prescription-dialog/prescription-dialog.component';
import { Prescription } from '../models/prescription';
import { ExamDialogComponent } from './exam-dialog/exam-dialog.component';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  @Input() user: User = new User();
  patients: Patient[] = [];
  showPatientHistory: Patient;

  displayedColumns: string[] = ['cpf', 'name', 'age', 'phone', 'icon-request-drug', 'icon-ask-exam', 'icon-history'];
  dataSource = new MatTableDataSource<Patient>();

  constructor(
    public dialog: MatDialog,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.listPatients();
  }

  listPatients() {
    this.patients = [];
    this.mainService.listPatients().subscribe(
      data => {
        if (data.length > 0) {
          data.forEach(patient => {
            this.patients.push(patient);
          });
        } else {
          alert("Não há pacientes cadastrados.");
        }
        this.dataSource.data = this.patients;
      },
      erro => {
        console.log(erro);
        alert("Houve problema ao listar pacientes, entre em contato com o administrador.");
      }
    )
  }

  prescriptionDialog(patient: Patient) {
    const dialogRef = this.dialog.open(PrescriptionDialogComponent, {
      data: {
        patient: patient,
        doctor: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.response && result.prescription && this.validatePrescription(result.prescription)) {
        const prescription = result.prescription;
        prescription.date = new Date();
        this.mainService.insertPrescription(prescription).subscribe(
          result => {
            if (result.status) {
              alert('Prescrição de medicamento ' + prescription.medicine.genericName + ' para ' + prescription.patient.name + ' salva com sucesso.');  
            } else {
              alert('Houve um problema ao cadastrar prescrição de medicamento.');
            }
          },
          erro => {
            console.log(erro);
            alert('Houve um problema ao cadastrar prescrição de medicamento.');
          }
        )
      }
    });   

  }

  validatePrescription(prescription: Prescription) {
    let r = false;
    if(prescription.doctor && prescription.doctor.cpf && prescription.patient && prescription.patient.cpf && prescription.medicine
    && prescription.medicine.factoryName && prescription.cicle) {
      r = true;
    }
    return r;
  }

  examDialog(patient: Patient) {
    const dialogRef = this.dialog.open(ExamDialogComponent, {
      data: {
        doctor: this.user,
        patient: patient
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.response && result.exam) {
        const exam = result.exam;
        exam.date = new Date();
        this.mainService.insertExam(exam).subscribe(
          result => {
            if(result.status) {
              alert('Exame salvo com sucesso');
            } else {
              alert('Houve um erro ao tentar salvar o exame');
            }
          },
          erro => {
            console.log(erro);
            alert('Houve um problema ao tentar salvar o exame. Entre em contato com o administrador');
          }
        )
      }
    });
  }

  showHistory(patient: Patient) {
    this.showPatientHistory = patient;
  }

}
