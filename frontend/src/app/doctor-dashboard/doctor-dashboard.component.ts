import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../models/patient';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MainService } from '../main.service';
import { User } from '../models/user';
import { PrescriptionDialogComponent } from './prescription-dialog/prescription-dialog.component';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  @Input() user: User = new User();
  patients: Patient[] = [];

  displayedColumns: string[] = ['cpf', 'name', 'age', 'phone', 'button-request-drug', 'button-ask-exam'];
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
        patient: patient 
      }
    });

  }

}
