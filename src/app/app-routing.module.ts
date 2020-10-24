import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);
const profileModule = () =>
  import('./profile/profile.module').then((x) => x.ProfileModule);
const moviesModule = () =>
  import('./movies/movies.module').then((x) => x.MoviesModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  { path: 'movies', loadChildren: moviesModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
