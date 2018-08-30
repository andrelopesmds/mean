import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';
import { User } from './models/user';
import { Utils } from './utils/utils';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title: string = 'Clínica + Saúde';
  roleTypes = ['admin', 'assistente', 'medico'];
  user: User = new User();
  utils: Utils = new Utils();

  constructor(
    private mainService: MainService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.user.cpf && this.user.password) {
      this.mainService.login(this.user).subscribe(
        result => {
          if (result.auth && result.token && result.data && this.roleTypes.includes(result.data.role)) {
            this.user = result.data;
            this.mainService.createHttpOptions(result.token);

          } else {
            alert('Usuário não encontrado ou sem permissão de acesso');
          }
        },
        () => {
          this.dialog.open(AlertDialogComponent, {
            data: {
              message: 'Usuário não encontrado ou sem permissão de acesso'
            }
          });
        });
    } else {
      alert("Todos os campos são obrigatórios");
    }
  }

  logout() {
    this.user = new User();
  }

}
