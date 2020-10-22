import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  login(username, password, remember) {
    return this.http
      .post<User>(`${environment.apiUrl}/users/signin`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          remember ? localStorage.setItem('user', JSON.stringify(user)) : '';
          this.userSubject.next(user);
          return user;
        })
      );
  }

  register(
    firstname: string,
    lastname: string,
    username: string,
    password: string
  ) {
    return this.http
      .post<any>(`${environment.apiUrl}/users`, {
        firstname,
        lastname,
        username,
        password,
      })
      .pipe(tap((x) => x));
  }
}
