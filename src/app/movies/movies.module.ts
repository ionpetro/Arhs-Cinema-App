import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';
import { FavoriteComponent } from './favorite/favorite.component';

@NgModule({
  declarations: [
    LayoutComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    MovieCardComponent,
    MoviePreviewComponent,
    FavoriteComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class MoviesModule {}
