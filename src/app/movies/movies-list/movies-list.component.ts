import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  movies: Movie[];
  filteredMovies: Movie[] = [];
  error: string;

  constructor(
    private moviesService: MoviesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.movies$ = this.moviesService.getMovies();
    this.movies$.subscribe(
      (movies) => {
        this.movies = movies;
        this.filteredMovies = movies;
      },
      (error) => {
        this.error = error;
      }
    );
    this.userService.getFavoriteMovies().subscribe((movies) => {
      for (let movie of movies) {
        this.movies.map((x) => {
          if (x.id === movie.id) {
            x.favoriteId = movie.favoriteId;
          }
        });
      }
    });
  }

  deleteMovie(movie: Movie) {
    this.moviesService.deleteMovie(movie.id).subscribe((movie) => {
      // update current Movies list
      this.movies = this.movies.filter((x) => x.id !== movie.id);
      this.filteredMovies = this.movies;
    });
  }

  addToFavorites(movie: Movie) {
    this.userService.addFavoriteMovie(movie).subscribe((movie) => {
      //update movies list
      this.movies.map((x) => {
        if (x.id === movie.movieId) {
          x.favoriteId = movie.id;
        }
      });
    });
  }

  deleteFavorite(movie: Movie) {
    this.userService
      .deleteFavoriteMovie(movie.favoriteId)
      .subscribe((movie) => {
        this.movies.map((x) => {
          if (x.id === movie.movieId) {
            delete x.favoriteId;
          }
        });
      });
  }
}
