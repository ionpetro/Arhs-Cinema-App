import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';

@NgModule({
  declarations: [LayoutComponent, MoviesListComponent],
  imports: [CommonModule, MoviesRoutingModule],
})
export class MoviesModule {}
