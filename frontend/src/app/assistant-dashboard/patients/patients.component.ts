import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { MainService } from '../../main.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { UpdatePatientDialogComponent } from '../update-patient-dialog/update-patient-dialog.component';
import { Utils } from '../../utils/utils';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  newPatient: Patient = new Patient();
  patients: Patient[] = [];
  utils: Utils = new Utils();

  displayedColumns: string[] = ['cpf', 'name', 'age', 'phone', 'button-update', 'button-remove'];
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

  insertPatient() {
    if (this.newPatient.name && this.newPatient.age && this.newPatient.cpf && this.newPatient.phone) {
      this.mainService.insertPatient(this.newPatient).subscribe(
        data => {
          if (data.status) {
            this.listPatients();
            this.mainService.callScheduleToUpdatePatients(true);
            alert(this.newPatient.name + " foi cadastrado com sucesso!");
          } else {
            alert("Houve problema ao efetuar cafastro, verfique se o cpf já está cadastrado ou entre em contato com o administrador.");  
          }
        },
        erro => {
          console.log(erro);
          alert("Houve problema de conexão ao efetuar cafastro, entre em contato com o administrador.");
        });
    } else {
      alert("Todos os campos são obrigatórios");
    }
  }

  updatePatientDialog(patient) {
    const dialogRef = this.dialog.open(UpdatePatientDialogComponent, {
      data: {
        patient: this.utils.makeCopy(patient)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.response && !this.utils.isEqual(result.patient, patient)) {
        this.mainService.updatePatient(result.patient).subscribe(
         data => {
           if(data.status) {
             this.listPatients();
             this.mainService.callScheduleToUpdatePatients(true);
             alert(result.patient.name + " foi atualizado.");
           }
         },
         erro => {
           console.log(erro);
         }
        )
      } else if(result && result.response) {
        alert("Não houveram modificações para atualizar.");
      }
    });
    
  }

  deleteConfirmation(patient) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Tem certeza que deseja excluir ' + patient.name + '?',
        buttonLabel: 'Excluir'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.response) {
        this.removePatient(patient);
      }
    });
  }

  removePatient(patient: Patient) {
    this.mainService.removePatient(patient).subscribe(
      data => {
        if(data.status) {
          this.listPatients();
          this.mainService.callScheduleToUpdatePatients(true);
          alert(patient.name + " foi removido com sucesso");
        } else {
          alert("Este paciente não foi encontrado, entre em contato com o administrador.");
        }
      },
      erro => {
        console.log(erro);
        alert("Houve problema de conexão ao tentar remover o usuário, entre em contato com o administrador.");
      }
    );
  }

}
