import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { MainService} from '../main.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  newUser: User = new User();
  users: User[] = [];

  displayedColumns: string[] = ['name', 'password', 'role', 'cpf', 'phone', 'button-update', 'button-remove'];
  dataSource = new MatTableDataSource<User>();

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.newUser.role = 'admin';
    this.listUsers();
  }


  listUsers() {
    this.mainService.listUsers().subscribe(
      data => {
        if(data.length > 0) {
          this.users = [];
          data.forEach(user => {
            this.users.push(user);
          });
          this.dataSource.data = this.users;
        } else {
          alert("Houve problema ao listar usuários ou não há usuários cadastrados");
        }
      },
      erro => {
        console.log(erro);
        alert("Houve problema ao listar usuários, entre em contato com o administrador");
      }
    )
  }

  insertUser() {
    if(this.newUser.username && this.newUser.password && this.newUser.role && this.newUser.cpf && this.newUser.phone) {
      this.mainService.insertUser(this.newUser).subscribe(
        data => {
          if(data.status && data.status == true) {
            alert("Usuário cadastrado com sucesso");
            this.listUsers();
          } else {
            alert("Houve problema de conexão ao efetuar cafastro, entre em contato com o administrador");  
          }
        },
        erro => {
          console.log(erro);
          alert("Houve problema de conexão ao efetuar cafastro, entre em contato com o administrador");
        });
    } else {
      alert("Todos os campos são obrigatórios");
    }
  }

  teste(user: User) {
    console.log("ok");
    console.log(user);
  }

}
