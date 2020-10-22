import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { map, switchMap, tap } from 'rxjs/operators';
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
        map(({ user }) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          remember ? localStorage.setItem('user', JSON.stringify(user)) : '';
          this.userSubject.next(user);
          return user;
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
