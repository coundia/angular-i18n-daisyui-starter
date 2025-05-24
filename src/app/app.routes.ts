import {Routes} from '@angular/router';
import {HomeComponent} from './shared/home/home.component';
import {LoginComponent} from './shared/security/login/login.component';
import {authGuard} from './shared/security/guard/auth.guard';
import {RegisterComponent} from './shared/security/register/register.component';
import {ForgotPasswordComponent} from './shared/security/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './shared/security/reset-password/reset-password.component';
import {userProfileRoutes} from './user-profile/user.routes';
import {categoryRoutes} from './features/category/category.routes';

export const routes = [

  ...categoryRoutes,
  ...userProfileRoutes,

  {path: '', component: HomeComponent},
  {path: 'security/login', component: LoginComponent},
  {path: 'security/register', component: RegisterComponent},

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },

  {path: 'security/forgot-password', component: ForgotPasswordComponent},
  {path: 'security/reset-password', component: ResetPasswordComponent},

  {path: '**', redirectTo: ''}
];
