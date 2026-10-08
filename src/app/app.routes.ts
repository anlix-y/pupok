import { Routes } from '@angular/router';
import { Pupocheck } from './pupocheck/pupocheck';

export const routes: Routes = [
  { path: '', component: Pupocheck },
  { path: '**', redirectTo: '' }
];
