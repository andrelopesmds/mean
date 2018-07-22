import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  constructor(private http: HttpClient) { }

  getData() {
    this.http.get('/api').subscribe(
      data => {
        console.log("DATA");
        console.log(data);
      },
      erro => {
        console.log("erro");
        console.log(erro);
      });
  }

}
