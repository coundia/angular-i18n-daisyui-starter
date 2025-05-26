import { Routes } from '@angular/router';
import { authGuard } from '../../shared/security/guard/auth.guard';

export const chatRoutes: Routes = [
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/chat-list.component').then(m => m.ChatListComponent),
  },
  {
    path: 'chat/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/chat-form.component').then(m => m.ChatFormComponent),
  },
  {
    path: 'chat/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/chat-form.component').then(m => m.ChatFormComponent),
  },
    {
    path: 'chat/:id/view',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/chat-view.component').then(m => m.ChatViewComponent),
  }
];
