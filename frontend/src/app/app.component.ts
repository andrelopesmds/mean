import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title: string = 'Clínica sua Saúde';


  constructor(
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.mainService.getData();
  }
  
  

}
