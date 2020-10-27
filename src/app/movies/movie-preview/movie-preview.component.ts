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
  imgUrl: string;
  defaultUrl: string = 'https://i.imgur.com/4JS4jY7.jpg';

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.moviesService.getMovieById(this.id).subscribe((x) => {
      this.movie = x;
      this.moviesService
        .searchMovieDetails(this.movie.title)
        .subscribe((x) =>
          x ? (this.imgUrl = x) : (this.imgUrl = this.defaultUrl)
        );
    });
  }

  back() {
    this._location.back();
  }
}
