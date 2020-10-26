import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { favoriteMovieCorrelation } from '../models/favoriteMovieCorrelation';
import { Movie } from '../models/movie';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/details`);
  }

  deleteUser(): Observable<User> {
    return this.http
      .delete<User>(`${environment.apiUrl}/users`)
      .pipe(tap((_) => this.authService.logout()));
  }

  getFavoriteMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.apiUrl}/users/favorites`);
  }

  addFavoriteMovie(movie: Movie): Observable<favoriteMovieCorrelation> {
    return this.http.post<favoriteMovieCorrelation>(
      `${environment.apiUrl}/users/favorites`,
      {
        movieId: movie.id,
      }
    );
  }

  deleteFavoriteMovie(id: string): Observable<favoriteMovieCorrelation> {
    return this.http.delete<favoriteMovieCorrelation>(
      `${environment.apiUrl}/users/favorites/${id}`
    );
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
        propName === 'confirmPassword' ||
        obj[propName] === user[propName] ||
        !obj[propName]
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
