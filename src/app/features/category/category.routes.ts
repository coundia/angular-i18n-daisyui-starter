import { Routes } from '@angular/router';
import {authGuard} from '../../shared/security/guard/auth.guard';

export const categoryRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/category-list.component').then(m => m.CategoryListComponent),
  },
  {
    path: 'new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/category-form.component').then(m => m.CategoryFormComponent),
  },
  {
    path: ':id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/category-form.component').then(m => m.CategoryFormComponent),
  }
];
