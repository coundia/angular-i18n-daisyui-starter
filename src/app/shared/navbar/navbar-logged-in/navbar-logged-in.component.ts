import {Component, computed} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../security/services/auth.service';
import {SHARED_IMPORTS} from '../../constantes/shared-imports';

@Component({
  selector: 'app-navbar-logged-in',
  imports: [
    RouterLinkActive,
    RouterLink,
    SHARED_IMPORTS
  ],
  templateUrl: './navbar-logged-in.component.html',
  styleUrl: './navbar-logged-in.component.css'
})
export class NavbarLoggedInComponent {

  isLogged = computed(() => !!localStorage.getItem('token'));

  constructor(private auth: AuthService) {

  }

  logout() {
    this.auth.logout();

    window.location.href = '/';
  }

}
