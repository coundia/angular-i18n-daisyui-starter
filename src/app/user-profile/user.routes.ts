import { Routes } from '@angular/router';
import {authGuard} from '../shared/security/guard/auth.guard';

export const userProfileRoutes: Routes = [
  {
    path: 'me',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/user-profile.component').then(m => m.UserProfileComponent),
  }
];
