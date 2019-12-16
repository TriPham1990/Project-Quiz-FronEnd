import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StatusUser} from '../interface/statusUser';
import {User} from '../interface/user';
import {Observable} from 'rxjs';
import {Login} from '../interface/login';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  statusUser: StatusUser = {userName: null, role: [null], jwtToken: null, avatarLink: null};

  userOnline = '';

  private API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {
  }

  createUSer(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/signup`, user);
  }

  userLogin(login: Login): Observable<any> {
    return this.http.post<Login>(`${this.API_URL}/signin`, login);
  }
}
