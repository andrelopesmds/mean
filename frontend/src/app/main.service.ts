import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  constructor(private http: HttpClient) { }

  getData() {
    this.http.get('http://localhost:8080').subscribe(
      data => {
        console.log(data);
      });


    return "works";
  }

}
