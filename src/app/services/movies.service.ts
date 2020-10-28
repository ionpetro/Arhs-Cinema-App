import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesUrl = environment.apiUrl;
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

  updateMovie(
    currentMovie: Movie,
    movie: Movie,
    id: string
  ): Observable<Movie> {
    movie = this.keepChanges(currentMovie, movie);
    return this.http.put<Movie>(`${environment.apiUrl}/movies/${id}`, movie);
  }

  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${environment.apiUrl}/movies/${id}`);
  }

  keepChanges(currentMovie: Movie, movie: Movie) {
    for (let prop in movie) {
      if (currentMovie[prop] === movie[prop]) {
        delete movie[prop];
      }
      return movie as Movie;
    }
  }

  searchMovieDetails(movieName: string): Observable<string> {
    const options = this.createHttpOptions(movieName);

    return this.http.get(`${environment.config.omdbApi.url}`, options).pipe(
      map(
        (data: any) => {
          if (data.Search) {
            return data.Search[0].Poster;
          }
        },
        (error) => {
          return error;
        }
      )
    );
  }

  private createHttpOptions(movieName: string) {
    // omdb free search api
    const params = new HttpParams({
      fromObject: { s: movieName, apikey: environment.config.omdbApi.apiKey },
    });
    return { params };
  }
}
