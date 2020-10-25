import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input('movie') movie: Movie;
  @Input('favorite') favorite: boolean;
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output('addFavorite') addfavoriteEvent: EventEmitter<
    void
  > = new EventEmitter<void>();
  @Output('deleteFavorite') deletefavoriteEvent: EventEmitter<
    void
  > = new EventEmitter<void>();

  selected: boolean;
  favoriteMovies: Movie[];
  isFavorite: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getFavoriteMovies().subscribe((movies) => {
      this.favoriteMovies = movies;

      for (let movie of movies) {
        if (movie.id === this.movie.id) {
          this.isFavorite = true;
        }
      }

      this.selected = this.isFavorite;
    });
  }

  onDeleteButtonClick(event) {
    this.deleteEvent.emit();
    // not propagate (route) to movies/:id if the item is deleted
    event.stopPropagation();
  }

  onAddToFavoritesButtonClick(event) {
    // console.log(this.movie);
    this.selected = !this.selected;
    // console.log(this.selected);
    this.addfavoriteEvent.emit();
    event.stopPropagation();
  }

  onDeleteFromFavoritesButtonClick(event) {
    this.selected = !this.selected;
    this.deletefavoriteEvent.emit();
    event.stopPropagation();
  }
}
