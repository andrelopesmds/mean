import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.get<User>('/api/login?username='+ user.username + '&password=' + user.password);
  }

}
