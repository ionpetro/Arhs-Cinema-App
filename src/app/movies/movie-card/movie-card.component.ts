import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit, OnChanges {
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
    this.selected = Boolean(this.movie.favoriteId);
  }

  ngOnChanges(): void {
    this.selected = Boolean(this.movie.favoriteId);
  }

  onDeleteButtonClick(event) {
    this.deleteEvent.emit();
    // not propagate (route) to movies/:id if the item is deleted
    event.stopPropagation();
  }

  onAddToFavoritesButtonClick(event) {
    this.addfavoriteEvent.emit();
    event.stopPropagation();
  }

  onDeleteFromFavoritesButtonClick(event) {
    this.deletefavoriteEvent.emit();
    event.stopPropagation();
  }
}
