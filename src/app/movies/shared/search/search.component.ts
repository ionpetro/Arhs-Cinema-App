import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor() {}
  @Input('movies') movies: Movie[];
  @Output('filtered') filtered: EventEmitter<Movie[]> = new EventEmitter<
    Movie[]
  >();
  filteredMovies: Movie[];

  ngOnInit(): void {}

  filter(query: string) {
    query = query.toLowerCase().trim();
    this.filteredMovies = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
    this.filtered.emit(this.filteredMovies);
  }
}
