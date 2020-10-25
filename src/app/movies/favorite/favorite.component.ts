import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favoriteMoviesObservable: Observable<Movie[]>;
  favoriteMovies: Movie[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.favoriteMoviesObservable = this.userService.getFavoriteMovies();
    this.favoriteMoviesObservable.subscribe((movies) => {
      this.favoriteMovies = movies;
    });
  }
}
