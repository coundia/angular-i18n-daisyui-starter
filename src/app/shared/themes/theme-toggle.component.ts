import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import {Theme, ThemeService} from './theme.service';
import {SHARED_IMPORTS} from "../constantes/shared-imports";

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html'
})
export class ThemeToggleComponent {
  currentTheme$: Observable<Theme>;

  constructor(private themeService: ThemeService) {
    this.currentTheme$ = this.themeService.currentTheme$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Optional: Methods to set theme explicitly
  setLightTheme(): void {
    this.themeService.setTheme('light');
  }

  setDarkTheme(): void {
    this.themeService.setTheme('dark');
  }

  setSystemTheme(): void {
    this.themeService.setTheme('system');
  }
}
