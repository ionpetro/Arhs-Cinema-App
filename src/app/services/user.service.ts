import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
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

  getFavoriteMovies() {
    return this.http.get<Movie[]>(`${environment.apiUrl}/users/favorites`);
  }

  favoriteMovie(movie: Movie) {
    return this.http.post<any>(`${environment.apiUrl}/users/favorites`, {
      movieId: movie.id,
    });
  }

  deleteFavoriteMovie(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/users/favorites/${id}`);
  }

  updateUser(updatedUser: any): Observable<User> {
    const updatedCleanUser = this.keepChanges(updatedUser);
    return this.http
      .put<User>(`${environment.apiUrl}/users`, updatedCleanUser as User)
      .pipe(
        map((x) => {
          this.updateLocalStorage(x);
          this.authService.userSubject.next(x);
          return x;
        })
      );
  }

  // remove confirmPassword and password if blank
  // and keep only the changes that user made
  keepChanges(obj: User): User {
    let user = this.authService.userValue;

    for (let propName in obj) {
      if (
        obj[propName] === user[propName] ||
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

  // I used checked remember me, on update we should update the localStorage
  updateLocalStorage(user: User) {
    if (localStorage.getItem('user')) {
      let token = JSON.parse(localStorage.getItem('user')).jwt;
      let obj = { user: user, jwt: token };
      localStorage.setItem('user', JSON.stringify(obj));
    }
  }
}
