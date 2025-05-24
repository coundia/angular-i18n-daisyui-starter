import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {SHARED_IMPORTS} from '../../constantes/shared-imports';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, RouterModule,SHARED_IMPORTS],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  token = '';
  newPassword = '';
  message = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService) {}

  onReset() {
    this.error = '';
    this.message = '';
    this.loading = true;
    this.auth.resetPassword(this.token, this.newPassword).subscribe({
      next: (data: string) => {
        this.message = data || 'Password has been reset';
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error || 'Reset failed';
        this.loading = false;
      }
    });


  }
}
