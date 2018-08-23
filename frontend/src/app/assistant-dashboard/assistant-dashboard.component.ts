import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assistant-dashboard',
  templateUrl: './assistant-dashboard.component.html',
  styleUrls: ['./assistant-dashboard.component.css']
})
export class AssistantDashboardComponent implements OnInit {

  menuOption: number;

  constructor() { }

  ngOnInit() {
    this.menuOption = 1;
  }

  changeMenuOption(option: number) {
    this.menuOption = option;
  }

}
