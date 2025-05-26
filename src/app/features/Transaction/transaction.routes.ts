import { Routes } from '@angular/router';
import { authGuard } from '../../shared/security/guard/auth.guard';

export const transactionRoutes: Routes = [
  {
    path: 'transaction',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/transaction-list.component').then(m => m.TransactionListComponent),
  },
  {
    path: 'transaction/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/transaction-form.component').then(m => m.TransactionFormComponent),
  },
  {
    path: 'transaction/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/transaction-form.component').then(m => m.TransactionFormComponent),
  },
    {
    path: 'transaction/:id/view',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/transaction-view.component').then(m => m.TransactionViewComponent),
  }
];
