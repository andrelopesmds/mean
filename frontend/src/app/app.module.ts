import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule, MatSelectModule, MatTableModule, MatIconModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { AssistantDashboardComponent } from './assistant-dashboard/assistant-dashboard.component';
import { PatientsComponent } from './assistant-dashboard/patients/patients.component';
import { UpdatePatientDialogComponent } from './assistant-dashboard/update-patient-dialog/update-patient-dialog.component';
import { ScheduleComponent } from './assistant-dashboard/schedule/schedule.component';
import { MedicinesComponent } from './assistant-dashboard/medicines/medicines.component';
import { UpdateMedicineDialogComponent } from './assistant-dashboard/update-medicine-dialog/update-medicine-dialog.component';
import { UpdateMeetingDialogComponent } from './assistant-dashboard/update-meeting-dialog/update-meeting-dialog.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PrescriptionDialogComponent } from './doctor-dashboard/prescription-dialog/prescription-dialog.component';
import { ExamDialogComponent } from './doctor-dashboard/exam-dialog/exam-dialog.component';
import { ExamsComponent } from './assistant-dashboard/exams/exams.component';
import { ExamResultDialogComponent } from './assistant-dashboard/exams/exam-result-dialog/exam-result-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    ConfirmationDialogComponent,
    UpdateDialogComponent,
    AssistantDashboardComponent,
    PatientsComponent,
    UpdatePatientDialogComponent,
    ScheduleComponent,
    MedicinesComponent,
    UpdateMedicineDialogComponent,
    UpdateMeetingDialogComponent,
    DoctorDashboardComponent,
    PrescriptionDialogComponent,
    ExamDialogComponent,
    ExamsComponent,
    ExamResultDialogComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    UpdateDialogComponent,
    UpdatePatientDialogComponent,
    UpdateMedicineDialogComponent,
    UpdateMeetingDialogComponent,
    PrescriptionDialogComponent,
    ExamDialogComponent,
    ExamResultDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
