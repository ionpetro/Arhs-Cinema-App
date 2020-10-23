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
  public token: string;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).user
        : null
    );
    if (localStorage.getItem('user')) {
      this.token = JSON.parse(localStorage.getItem('user')).jwt;
    }
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    // console.log(this.userSubject.value);
    return this.userSubject.value;
  }

  login(username: string, password: string, remember: boolean): any {
    return this.http
      .post<any>(`${environment.apiUrl}/users/signin`, {
        username,
        password,
      })
      .pipe(
        map((userObject) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          remember
            ? localStorage.setItem('user', JSON.stringify(userObject))
            : '';
          this.userSubject.next(userObject.user);
          this.token = userObject.jwt;
          return userObject;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
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
