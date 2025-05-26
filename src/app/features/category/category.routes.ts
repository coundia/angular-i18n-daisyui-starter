import { Routes } from '@angular/router';
import { authGuard } from '../../shared/security/guard/auth.guard';

export const categoryRoutes: Routes = [
  {
    path: 'category',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/category-list.component').then(m => m.CategoryListComponent),
  },
  {
    path: 'category/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/category-form.component').then(m => m.CategoryFormComponent),
  },
  {
    path: 'category/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/category-form.component').then(m => m.CategoryFormComponent),
  },
  {
    path: 'category/:id/view',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/category-view.component').then(m => m.CategoryViewComponent),
  },
];
