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
  movies: Observable<Movie[]>;
  currentMovies: Movie[];
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.movies = this.moviesService.getMovies();
    this.movies.subscribe((movies) => (this.currentMovies = movies));
  }

  deleteMovie(movie: Movie) {
    this.moviesService.deleteMovie(movie.id).subscribe((movie) => {
      // update current Movies list
      this.currentMovies = this.currentMovies.filter((x) => x.id !== movie.id);
    });
  }
}
