import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { List } from './components/list/list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'inicio', component: Home },
  { path: 'productos', component: List },
  { path: '**', redirectTo: '' }
];
