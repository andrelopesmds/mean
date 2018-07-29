import { Component, OnInit, Inject } from '@angular/core';
import { Patient } from '../../models/patient';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-patient-dialog',
  templateUrl: './update-patient-dialog.component.html',
  styleUrls: ['./update-patient-dialog.component.css']
})
export class UpdatePatientDialogComponent implements OnInit {

  patient: Patient;

  constructor(
    public dialogRef: MatDialogRef<UpdatePatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  
  ) { }

  ngOnInit() {
    this.patient = this.data.patient;
  }

}