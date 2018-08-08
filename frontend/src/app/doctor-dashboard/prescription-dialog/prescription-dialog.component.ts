import { Component, OnInit, Inject } from '@angular/core';
import { Patient } from '../../models/patient';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Prescription } from '../../models/prescription';
import { Medicine } from '../../models/medicine';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-prescription-dialog',
  templateUrl: './prescription-dialog.component.html',
  styleUrls: ['./prescription-dialog.component.css']
})
export class PrescriptionDialogComponent implements OnInit {

  prescription: Prescription = new Prescription();
  medicines: Medicine[] = [];

  constructor(
    public dialogRef: MatDialogRef<PrescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.listMedicines();
    this.prescription.patient = this.data.patient;
    this.prescription.doctor = this.data.doctor;
    this.prescription.medicine = new Medicine();
  }

  listMedicines() {
    this.mainService.listMedicines().subscribe(
      data => {
        if (data.length > 0) {
          data.forEach(medicine => {
            this.medicines.push(medicine);
          });
          this.prescription.medicine.genericName = this.medicines[0].genericName;
        } else {
          alert('Não há medicamentos cadastrados.');
        }
      },
      erro => {
        console.log(erro);
        alert('Houve problema ao listar medicamentos, entre em contato com o administrador.');
      }
    )
  }
  
}
