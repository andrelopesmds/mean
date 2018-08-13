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
  roleTypes = ['admin', 'assistente', 'medico'];
  user: User = new User();

  constructor(
    private mainService: MainService
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
            alert("Usuário não encontrado ou sem permissão de acesso");
          }
        },
        erro => {
          alert(erro.error.message);
        });
    } else {
      alert("Todos os campos são obrigatórios");
    }
  }
    

}
