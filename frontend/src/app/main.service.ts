import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.get<User>('/api/login?username='+ user.username + '&password=' + user.password);
  }

  listUsers() {
    return this.http.get<Array<User>>('/api/users');
  }

  insertUser(user: User) {
    return this.http.post<any>('api/users', user, this.httpOptions);
  }

  updateUser(user: User) {
    return this.http.put<any>('api/users', user, this.httpOptions);
  }

  removeUser(user: User) {
    return this.http.delete<any>('api/users?username='+ user.username, this.httpOptions);
  }

}
