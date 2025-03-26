import { Routes } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { FavoritesComponent } from './views/favorites/favorites.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainPageComponent },
  { path: 'favorites', component: FavoritesComponent },
];
