import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {SHARED_IMPORTS} from '../../constantes/shared-imports';
import {RegisterResponse} from '../models/register-response.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, SHARED_IMPORTS],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';
  success = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {
  }

  onRegister() {
    this.error = '';
    this.success = '';
    this.loading = true;
    this.auth.register({username: this.username, password: this.password}).subscribe({
      next: (data: RegisterResponse) => {
        this.success = data.message;
        this.auth.setToken(data.token);
        this.auth.setUser(data);
        this.router.navigate(['/dashboard']);
      },

      error: (err: { error: { message: string; }; }) => {
        this.error = err?.error?.message || 'Registration failed';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
