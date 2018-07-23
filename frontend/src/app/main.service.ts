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

  login(username: string, password: string) {
    console.log("we are trying", username," - ", password);
    this.http.get('/api?username='+ username + '&password=' + password).subscribe(
      data => {
        console.log(data);
      },
      erro => {
        console.log(erro);
      });
  }

}
