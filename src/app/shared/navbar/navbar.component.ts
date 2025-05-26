import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarLoggedInComponent } from './navbar-logged-in/navbar-logged-in.component';
import { NavbarGuestComponent } from './navbar-guest/navbar-guest.component';
import { AuthService } from '../security/services/auth.service';
import { ThemeToggleComponent } from '../themes/theme-toggle.component';
import { SHARED_IMPORTS } from '../constantes/shared-imports';
import {SidePanelComponent} from '../side-panel/side-panel.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    NavbarLoggedInComponent,
    NavbarGuestComponent,
    ThemeToggleComponent,
    SHARED_IMPORTS,
    SidePanelComponent,

  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isOpen = signal(false);
  isLogged = computed(() => !!this.auth.token());

  constructor(public auth: AuthService) {}

  toggleMenu() {
    this.isOpen.update(v => !v);
    if (!this.isOpen()) {
      return;
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }


  closeMenu() {
    this.isOpen.set(false);
  }
}
