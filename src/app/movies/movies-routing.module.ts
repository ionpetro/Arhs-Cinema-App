import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';
import { MovieDetailsComponent } from './movies-details/movie-details.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MoviesListComponent },
      { path: ':id', component: MoviePreviewComponent },
      { path: 'new', component: MovieDetailsComponent },
      { path: 'edit/:id', component: MovieDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
