import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../security/services/auth.service';
import {SHARED_IMPORTS} from '../constantes/shared-imports';

@Component({
  selector: 'app-landing',
  imports: [
    RouterLink,
    SHARED_IMPORTS
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  readonly auth = inject(AuthService);
  get username(): string | null {
    const token = this.auth.token();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.sub || null;
  }

}
