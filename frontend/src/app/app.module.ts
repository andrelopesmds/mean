import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule, MatSelectModule, MatTableModule, MatIconModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { AssistantDashboardComponent } from './assistant-dashboard/assistant-dashboard.component';
import { PatientsComponent } from './assistant-dashboard/patients/patients.component';
import { UpdatePatientDialogComponent } from './assistant-dashboard/update-patient-dialog/update-patient-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    ConfirmationDialogComponent,
    UpdateDialogComponent,
    AssistantDashboardComponent,
    PatientsComponent,
    UpdatePatientDialogComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    UpdateDialogComponent,
    UpdatePatientDialogComponent
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
