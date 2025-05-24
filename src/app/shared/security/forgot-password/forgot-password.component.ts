import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {SHARED_IMPORTS} from '../../constantes/shared-imports';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule,SHARED_IMPORTS],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  username = '';
  message = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService) {}

  onForgot() {
    this.error = '';
    this.message = '';
    this.loading = true;
    this.auth.forgotPassword(this.username).subscribe({
      next: (data: string) => {
        this.message = data;
      },
      error: (err) => {
        this.error = err?.error || 'Failed to send reset email';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
