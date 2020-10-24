import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { SearchModule } from '../search/search.module';
import { MovieDetailsComponent } from './movies-details/movie-details.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LayoutComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    MovieCardComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SearchModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class MoviesModule {}
