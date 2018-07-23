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
          console.log(this.user);
        },
        erro => {
          console.log(erro);
        });
    } else {
      alert("Todos os campos são obrigatórios");
    }
  }
  
  

}
