import { Routes } from '@angular/router';
import { authGuard } from '../../shared/security/guard/auth.guard';

export const settingRoutes: Routes = [
  {
    path: 'setting',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/setting-list.component').then(m => m.SettingListComponent),
  },
  {
    path: 'setting/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/setting-form.component').then(m => m.SettingFormComponent),
  },
  {
    path: 'setting/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/setting-form.component').then(m => m.SettingFormComponent),
  },
    {
    path: 'setting/:id/view',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/setting-view.component').then(m => m.SettingViewComponent),
  }
];
