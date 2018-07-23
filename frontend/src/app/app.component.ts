import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title: string = 'Clínica sua Saúde';
  username: string;
  password: string;


  constructor(
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.mainService.getData();
  }

  login() {
    if(this.username && this.password) {
      console.log(this.username, this.password);
      this.mainService.login(this.username, this.password);
    } else {
      alert("Todos os campos são obrigatórios");
    }
  }
  
  

}
