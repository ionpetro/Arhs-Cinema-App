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
}
