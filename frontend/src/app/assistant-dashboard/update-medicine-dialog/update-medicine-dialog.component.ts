import { Component, OnInit, Inject } from '@angular/core';
import { Medicine } from '../../models/medicine';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-medicine-dialog',
  templateUrl: './update-medicine-dialog.component.html',
  styleUrls: ['./update-medicine-dialog.component.css']
})
export class UpdateMedicineDialogComponent implements OnInit {

  medicine: Medicine;

  constructor(
    public dialogRef: MatDialogRef<UpdateMedicineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  
  ) { }

  ngOnInit() {
    this.medicine = this.data.medicine;
  }

}
