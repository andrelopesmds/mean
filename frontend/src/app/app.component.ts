import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title: string = 'Clínica sua Saúde';
  user: User = new User();

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.user.username && this.user.password) {
      this.mainService.login(this.user).subscribe(
        data => {
          this.user = data;
          console.log(data);
          if(this.user.role != 'admin' && this.user.role != 'assistente' && this.user.role != 'medico') {
            alert("Usuário não encontrado ou sem permissão de acesso");
          }
        },
        erro => {
          console.log(erro);
          alert("Houve problema de conexão ao efetuar login, entre em contato com o administrador");
        });
    } else {
      alert("Todos os campos são obrigatórios");
    }
  }
    

}
