import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MoviesListComponent },
      { path: 'new', component: MovieDetailsComponent },
      { path: ':id', component: MoviePreviewComponent },
      { path: 'edit/:id', component: MovieDetailsComponent },
      { path: 'favorite', component: FavoriteComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
