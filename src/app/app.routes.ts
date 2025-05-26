import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './shared/security/login/login.component';
import { RegisterComponent } from './shared/security/register/register.component';
import { ForgotPasswordComponent } from './shared/security/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './shared/security/reset-password/reset-password.component';
import { authGuard } from './shared/security/guard/auth.guard';
import { userProfileRoutes } from './user-profile/user.routes';
import { categoryRoutes } from './features/category/category.routes';
import {settingRoutes} from './features/Setting/setting.routes';
import {accountRoutes} from './features/Account/account.routes';
import {accountUserRoutes} from './features/AccountUser/accountUser.routes';
import {chatRoutes} from './features/Chat/chat.routes';
import {transactionRoutes} from './features/Transaction/transaction.routes';

export const routes: Routes = [
  ...categoryRoutes,
  ...userProfileRoutes,
  ...settingRoutes,
  ...accountRoutes,
  ...accountUserRoutes,
  ...chatRoutes,
  ...transactionRoutes,

  { path: '', component: HomeComponent },
  { path: 'security/login', component: LoginComponent },
  { path: 'security/register', component: RegisterComponent },
  { path: 'security/forgot-password', component: ForgotPasswordComponent },
  { path: 'security/reset-password', component: ResetPasswordComponent },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },

  { path: '**', redirectTo: '' }
];
