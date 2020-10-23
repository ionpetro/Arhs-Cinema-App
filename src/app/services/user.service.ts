import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/details`);
  }

  deleteUser(): Observable<any> {
    return this.http
      .delete<any>(`${environment.apiUrl}/users`)
      .pipe(map(() => this.authService.logout()));
  }

  updateUser(updatedUser: any): Observable<User> {
    const updatedCleanUser = this.clean(updatedUser);
    console.log(updatedCleanUser);
    return this.http
      .put<User>(`${environment.apiUrl}/users`, updatedCleanUser as User)
      .pipe();
    // TODO
  }

  // remove confirmPassword and password if blank
  clean(obj: User): User {
    for (var propName in obj) {
      if (
        propName === 'confirmPassword' ||
        obj[propName] === '' ||
        obj[propName] === undefined ||
        obj[propName] === null
      ) {
        delete obj[propName];
      }
    }
    return obj as User;
  }
}
