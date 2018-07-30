import { Component, OnInit } from '@angular/core';
import { Meeting } from '../../models/metting';
import { MainService } from '../../main.service';
import { User } from '../../models/user';
import { Patient } from '../../models/patient';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  meetings: Meeting[] = [];
  doctors: User[] = [];
  patients: Patient[] = [];
  newMeeting: Meeting = new Meeting();

  displayedColumns: string[] = ['doctorName', 'patientName', 'date', 'hour', 'button-remove'];
  dataSource = new MatTableDataSource<Meeting>();

  constructor(
    public dialog: MatDialog,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.listDoctors();
    this.listPatients();
    this.listMeetings();
  }

  listDoctors() {
    this.doctors = [];
    this.mainService.listDoctors().subscribe(
      data => {
        if (data.length > 0) {
          data.forEach(doctor => {
            this.doctors.push(doctor);
          });
          this.newMeeting.doctor = this.doctors[0];
        } else {
          alert("Nenhum médico encontrado.");
        }
      },
      erro => {
        console.log(erro);
        alert("Houve um problema de conexão, contacte o administrador.");
      }
    );
  }

  listPatients() {
    this.patients = [];
    this.mainService.listPatients().subscribe(
      data => {
        if (data.length > 0) {
          data.forEach(patient => {
            this.patients.push(patient);
          });
          this.newMeeting.patient = this.patients[0];
        } else {
          alert("Nenhum paciente encontrado.");
        }
      },
      erro => {
        console.log(erro);
        alert("Houve um problema de conexão, contacte o administrador.");
      });
  }

  listMeetings() {
    this.meetings = [];
    this.mainService.listMeetings().subscribe(
      data => {
        if (data.length > 0) {
          data.forEach(meeting => {
            let temp = new Meeting();
            temp.doctor = new User();
            temp.doctor.name = meeting.doctorName;
            temp.doctor.cpf = meeting.doctorCpf;
            temp.patient = new Patient();
            temp.patient.name = meeting.patientName;
            temp.patient.cpf = meeting.patientCpf;
            temp.date = meeting.date;
            temp.hour = meeting.hour;
            this.meetings.push(temp);
          });
        } else {
          alert("Não há consultas cadastradas.");
        }
        this.dataSource.data = this.meetings;
      },
      erro => {
        console.log(erro);
        alert("Houve problema ao listar consultas, entre em contato com o administrador.");
      }
    )
  }

  getDate(datePicker: any) {
    this.newMeeting.date = datePicker.value;
  }

  insertMeeting() {
    if (this.newMeeting.doctor && this.newMeeting.patient && this.newMeeting.date && this.newMeeting.hour) {
      this.mainService.insertMeeting(this.newMeeting).subscribe(
        data => {
          if(data.status) {
            this.listMeetings();
            alert("Consulta de " + this.newMeeting.patient.name + " com o Dr. " + this.newMeeting.doctor.name + " agendada com sucesso!"); 
          } else {
            alert("Houve problema ao efetuar cafastro, entre em contato com o administrador.");    
          }
        },
        erro => {
          alert("Houve problema de conexão ao efetuar cafastro, entre em contato com o administrador.");
        }
      );
    } else {
      alert("Todos os campos são obrigatórios.");
    }
  }

  deleteConfirmation(meeting) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Tem certeza que deseja cancelar o agendamento de ' + meeting.patient.name + ' com o Dr. ' + meeting.doctor.name + ' ?',
        buttonLabel: 'Excluir'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.response) {
        this.removeMeeting(meeting);
      }
    });
  }

  removeMeeting(meeting: Meeting) {
    this.mainService.removeMeeting(meeting).subscribe(
      data => {
        if(data.status) {
          this.listMeetings();
          alert("Consulta foi cancelada com sucesso");
        } else {
          alert("Esta consulta não foi encontrada, entre em contato com o administrador.");
        }
      },
      erro => {
        console.log(erro);
        alert("Houve problema de conexão, entre em contato com o administrador.");
      }
    );
  }

}
