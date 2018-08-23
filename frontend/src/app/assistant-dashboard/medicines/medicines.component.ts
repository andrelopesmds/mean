import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine';
import { MainService } from '../../main.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { UpdateMedicineDialogComponent } from '../update-medicine-dialog/update-medicine-dialog.component';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  medicines: Medicine[] = [];
  newMedicine: Medicine = new Medicine();
  utils: Utils = new Utils();

  displayedColumns: string[] = ['genericName', 'factoryName', 'manufacturer', 'icon-update', 'icon-remove'];
  dataSource = new MatTableDataSource<Medicine>();

  constructor(
    public dialog: MatDialog,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.listMedicines();
  }

  listMedicines() {
    this.medicines = [];
    this.mainService.listMedicines().subscribe(
      data => {
        if (data.length > 0) {
          data.forEach(medicine => {
            this.medicines.push(medicine);
          });
        } else {
          alert("Não há medicamentos cadastrados.");
        }
        this.dataSource.data = this.medicines;
      },
      erro => {
        console.log(erro);
        alert("Houve problema ao listar pacientes, entre em contato com o administrador.");
      }
    )
  }

  insertMedicine() {
    if (this.newMedicine.factoryName && this.newMedicine.genericName && this.newMedicine.manufacturer) {
      this.mainService.insertMedicine(this.newMedicine).subscribe(
        data => {
          if (data.status) {
            this.listMedicines();
            alert(this.newMedicine.genericName + ' foi cadastrado com sucesso!');
          } else {
            alert('Houve problema ao efetuar cafastro, verfique se ' + this.newMedicine.genericName + ' já está cadastrado ou entre em contato com o administrador.');  
          }
        },
        erro => {
          console.log(erro);
          alert('Houve problema de conexão ao efetuar cafastro, entre em contato com o administrador.');
        });
    } else {
      alert('Todos os campos são obrigatórios');
    }
  }

  updateMedicineDialog(medicine) {
    const dialogRef = this.dialog.open(UpdateMedicineDialogComponent, {
      data: {
        medicine: this.utils.makeCopy(medicine)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.response && !this.utils.isEqual(result.medicine, medicine)) {
        this.mainService.updateMedicine(result.medicine).subscribe(
         data => {
           if(data.status) {
             this.listMedicines();
             alert(result.medicine.genericName + " foi atualizado.");
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


  deleteConfirmation(medicine) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Tem certeza que deseja excluir ' + medicine.genericName + '?',
        buttonLabel: 'Excluir'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.response) {
        this.removeMedicine(medicine);
      }
    });
  }

  removeMedicine(medicine: Medicine) {
    this.mainService.removeMedicine(medicine).subscribe(
      data => {
        if(data.status) {
          this.listMedicines();
          alert(medicine.genericName + " foi removido com sucesso");
        } else {
          alert("Este medicamento não foi encontrado, entre em contato com o administrador.");
        }
      },
      erro => {
        console.log(erro);
        alert("Houve problema de conexão ao tentar remover o usuário, entre em contato com o administrador.");
      }
    );
  }

}
