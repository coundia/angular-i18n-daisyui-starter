import { Routes } from '@angular/router';
import { authGuard } from '../../shared/security/guard/auth.guard';

export const accountRoutes: Routes = [
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/account-list.component').then(m => m.AccountListComponent),
  },
  {
    path: 'account/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/account-form.component').then(m => m.AccountFormComponent),
  },
  {
    path: 'account/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/account-form.component').then(m => m.AccountFormComponent),
  },
    {
    path: 'account/:id/view',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/account-view.component').then(m => m.AccountViewComponent),
  }
];
