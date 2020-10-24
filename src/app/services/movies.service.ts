import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.apiUrl}/movies`);
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${environment.apiUrl}/movies/${id}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${environment.apiUrl}/movies`, movie);
  }

  updateMovie(movie: Movie, id: string): Observable<Movie> {
    return this.http.put<Movie>(`${environment.apiUrl}/movies/${id}`, movie);
  }

  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${environment.apiUrl}/movies/${id}`);
  }
}
