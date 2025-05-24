import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { SHARED_IMPORTS } from '../../constantes/shared-imports';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, NgForOf, ...SHARED_IMPORTS],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  fields = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'login.username_placeholder',
      model: () => this.username,
      setModel: (val: string) => { this.username = val; }
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'login.password_placeholder',
      model: () => this.password,
      setModel: (val: string) => { this.password = val; }
    }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.error = '';
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: (data) => {
        this.auth.setToken(data.token);
        this.auth.setUser(data);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Login failed';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
