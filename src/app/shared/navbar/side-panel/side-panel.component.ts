import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../security/services/auth.service';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {
  private readonly auth = inject(AuthService);
  readonly isLogged = computed(() => this.auth.isLogged);
  readonly isOpen = signal(false);

  readonly user = computed(() => this.auth.user());

  toggleMenu() {
    this.isOpen.update(v => !v);
  }

  closeMenu() {
    this.isOpen.set(false);
  }

  logout() {
    this.auth.logout();
    this.closeMenu();
  }
}
