import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly STORAGE_KEY = 'theme-preference';
  private currentThemeSubject = new BehaviorSubject<Theme>(this.getInitialTheme());
  currentTheme$: Observable<Theme> = this.currentThemeSubject.asObservable();

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    // Apply initial theme derived from storage/system
    this.applyTheme(this.currentThemeSubject.getValue());

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        // Only re-apply if the user's preference is 'system'
        if (this.getStoredTheme() === 'system') {
          this.applyTheme('system');
        }
      });
  }

  private getInitialTheme(): Theme {
    const storedTheme = localStorage.getItem(this.STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
      return storedTheme;
    }
    // Default to system if no preference is stored
    return 'system'; // Changed to default to 'system'
  }

  private getStoredTheme(): Theme | null {
    const storedTheme = localStorage.getItem(this.STORAGE_KEY);
    return (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') ? storedTheme : null;
  }

  private getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme): void {
    const htmlElement = document.documentElement;

    // Always remove data-theme first to ensure clean state
    this.renderer.removeAttribute(htmlElement, 'data-theme');

    if (theme === 'dark') {
      this.renderer.setAttribute(htmlElement, 'data-theme', 'dark');
      localStorage.setItem(this.STORAGE_KEY, 'dark');
    } else if (theme === 'light') {
      // Light mode: ensure no data-theme attribute is present
      localStorage.setItem(this.STORAGE_KEY, 'light');
    } else { // theme === 'system'
      const systemTheme = this.getSystemTheme();
      if (systemTheme === 'dark') {
        this.renderer.setAttribute(htmlElement, 'data-theme', 'dark');
      }
      // If system is light, ensure data-theme is removed.
      // And remove storage key so it truly respects system preference.
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.currentThemeSubject.next(theme);
  }

  toggleTheme(): void {
    const current = this.currentThemeSubject.getValue();
    let nextTheme: Theme;
    if (current === 'light') {
      nextTheme = 'dark';
    } else if (current === 'dark') {
      nextTheme = 'system';
    } else { // current === 'system'
      nextTheme = 'light';
    }
    this.setTheme(nextTheme);
  }

  setTheme(theme: Theme): void {
    this.applyTheme(theme);
  }
}
