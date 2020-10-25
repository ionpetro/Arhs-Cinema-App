import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input('movie') movie: Movie;
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output('favorite') favoriteEvent: EventEmitter<void> = new EventEmitter<
    void
  >();
  constructor() {}

  ngOnInit(): void {}

  onDeleteButtonClick(event) {
    this.deleteEvent.emit();
    // not propagate (route) to movies/:id if the item is deleted
    event.stopPropagation();
  }

  onFavoritesButtonClick(event) {
    this.favoriteEvent.emit();
    event.stopPropagation();
  }
}
