import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidePanelService {
  readonly isOpen = signal(false);
  toggleMenu() {
    this.isOpen.update(o => !o);
  }
}
