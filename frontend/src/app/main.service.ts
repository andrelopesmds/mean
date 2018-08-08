import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';
import { Patient } from './models/patient';
import { Meeting } from './models/metting';
import { Subject, Observable } from 'rxjs';
import { Medicine } from './models/medicine';
import { MeetingUpdate } from './models/meetingUpdate';
import { Prescription } from './models/prescription';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.get<User>('/api/login?cpf='+ user.cpf + '&password=' + user.password);
  }

  listUsers() {
    return this.http.get<Array<User>>('/api/users');
  }

  insertUser(user: User) {
    return this.http.post<any>('api/users', user, this.httpOptions);
  }

  updateUser(user: User) {
    return this.http.put<any>('api/users', user, this.httpOptions);
  }

  removeUser(user: User) {
    return this.http.delete<any>('api/users?cpf='+ user.cpf, this.httpOptions);
  }

  listPatients() {
    return this.http.get<Array<Patient>>('api/patients');
  }

  insertPatient(patient: Patient) {
    return this.http.post<any>('api/patients', patient, this.httpOptions);
  }

  updatePatient(patient: Patient) {
    return this.http.put<any>('api/patients', patient, this.httpOptions);
  }

  removePatient(patient: Patient) {
    return this.http.delete<any>('api/patients?cpf=' + patient.cpf, this.httpOptions);
  }

  listDoctors() {
    return this.http.get<Array<User>>('api/users?role=medico');
  }

  listMeetings() {
    return this.http.get<Array<any>>('api/meetings');
  }

  insertMeeting(meeting: Meeting) {
    return this.http.post<any>('api/meetings', meeting, this.httpOptions);
  }

  updateMeeting(meeting: MeetingUpdate) {
    return this.http.put<any>('api/meetings', meeting, this.httpOptions);
  }

  removeMeeting(meeting: Meeting){
    return this.http.delete<any>('api/meetings?doctorCpf=' + meeting.doctor.cpf + '&patientCpf=' + meeting.patient.cpf + '&date=' + meeting.date + '&hour=' + meeting.hour);
  }

  callScheduleToUpdatePatients(update: boolean) {
    this.subject.next(update);
  }

  patientsUpdates(): Observable<any> {
    return this.subject.asObservable();
  }

  listMedicines() {
    return this.http.get<Array<Medicine>>('api/medicines');
  }

  insertMedicine(medicine: Medicine) {
    return this.http.post<any>('api/medicines', medicine, this.httpOptions);
  }

  updateMedicine(medicine: Medicine) {
    return this.http.put<any>('api/medicines', medicine, this.httpOptions);
  }

  removeMedicine(medicine: Medicine) {
    return this.http.delete<any>('api/medicines?factoryName=' + medicine.factoryName);
  }

  insertPrescription(prescription: Prescription) {
    return this.http.post<any>('api/prescriptions', prescription, this.httpOptions);
  }

}
