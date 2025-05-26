import { Routes } from '@angular/router';
import { authGuard } from '../../shared/security/guard/auth.guard';

export const accountUserRoutes: Routes = [
  {
    path: 'accountUser',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/accountUser-list.component').then(m => m.AccountUserListComponent),
  },
  {
    path: 'accountUser/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/accountUser-form.component').then(m => m.AccountUserFormComponent),
  },
  {
    path: 'accountUser/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/accountUser-form.component').then(m => m.AccountUserFormComponent),
  },
    {
    path: 'accountUser/:id/view',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/accountUser-view.component').then(m => m.AccountUserViewComponent),
  }
];
