import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.scss'],
})
export class MoviePreviewComponent implements OnInit {
  id: string;
  movie: Movie;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.moviesService.getMovieById(this.id).subscribe((x) => (this.movie = x));
  }

  back() {
    this._location.back();
  }
}
