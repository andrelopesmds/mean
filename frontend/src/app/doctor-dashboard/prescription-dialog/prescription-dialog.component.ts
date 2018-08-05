import { Component, OnInit, Inject } from '@angular/core';
import { Patient } from '../../models/patient';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-prescription-dialog',
  templateUrl: './prescription-dialog.component.html',
  styleUrls: ['./prescription-dialog.component.css']
})
export class PrescriptionDialogComponent implements OnInit {

  patient: Patient;

  constructor(
    public dialogRef: MatDialogRef<PrescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  
  ) { }

  ngOnInit() {
    this.patient = this.data.patient;
  }
}
