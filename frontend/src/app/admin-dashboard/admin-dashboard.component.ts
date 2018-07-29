import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../models/user';
import { MainService} from '../main.service';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  newUser: User = new User();
  users: User[] = [];

  displayedColumns: string[] = ['username', 'name', 'password', 'role', 'cpf', 'phone', 'button-update', 'button-remove'];
  dataSource = new MatTableDataSource<User>();

  constructor(
    public dialog: MatDialog,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.newUser.role = 'admin';
    this.listUsers();
  }


  listUsers() {
    this.users = [];
    this.mainService.listUsers().subscribe(
      data => {
        if(data.length > 0) {
          data.forEach(user => {
            this.users.push(user);
          });
        } else {
          alert("Houve problema ao listar usuários ou não há usuários cadastrados.");
        }
        this.dataSource.data = this.users;
      },
      erro => {
        console.log(erro);
        alert("Houve problema ao listar usuários, entre em contato com o administrador.");
      }
    )
  }

  insertUser() {
    if(this.newUser.username && this.newUser.name && this.newUser.password && this.newUser.role && this.newUser.cpf && this.newUser.phone) {
      this.mainService.insertUser(this.newUser).subscribe(
        data => {
          if(data.status) {
            this.listUsers();
            alert(this.newUser.name + " foi cadastrado com sucesso!");
          } else {
            alert("Houve problema de conexão ao efetuar cafastro, entre em contato com o administrador.");  
          }
        },
        erro => {
          console.log(erro);
          alert("Houve problema de conexão ao efetuar cafastro, entre em contato com o administrador.");
        });
    } else {
      alert("Todos os campos são obrigatórios");
    }
  }

  updateDialog(user) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: {
        user: this.makeCopy(user)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.response && !this.isEqual(result.user, user)) {
        this.mainService.updateUser(result.user).subscribe(
         data => {
           if(data.status) {
             this.listUsers();
             alert(result.user.name + " foi atualizado.");
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

  deleteConfirmation(user) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Tem certeza que deseja excluir ' + user.name + '?',
        buttonLabel: 'Excluir'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.response) {
        this.removeUser(user);
      }
    });
  }

  removeUser(user: User) {
    this.mainService.removeUser(user).subscribe(
      data => {
        if(data.status) {
          this.listUsers();
          alert(user.name + " foi removido com sucesso");
        } else {
          alert("Houve problema de conexão ao tentar remover o usuário ou este não foi encontrado, entre em contato com o administrador.");
        }
      },
      erro => {
        console.log(erro);
        alert("Houve problema de conexão ao tentar remover o usuário, entre em contato com o administrador.");
      }
    );
  }

  makeCopy(obj) {
    return (JSON.parse(JSON.stringify(obj)));
  }

  isEqual(obj1, obj2) {
    if(JSON.stringify(obj1) == JSON.stringify(obj2)) {
      return true;
    } else {
      return false;
    }
  }

}
