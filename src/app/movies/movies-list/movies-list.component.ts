import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  moviesObservable: Observable<Movie[]>;
  movies: Movie[];
  filteredMovies: Movie[];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesObservable = this.moviesService.getMovies();
    this.moviesObservable.subscribe((movies) => {
      this.movies = movies;
      this.filteredMovies = movies;
    });
  }

  deleteMovie(movie: Movie) {
    this.moviesService.deleteMovie(movie.id).subscribe((movie) => {
      // update current Movies list
      this.movies = this.movies.filter((x) => x.id !== movie.id);
      this.filteredMovies = this.movies;
    });
  }

  filter(query: string) {
    query = query.toLowerCase().trim();
    this.filteredMovies = this.movies.filter((movie) =>
      movie.title.includes(query)
    );
  }
}
