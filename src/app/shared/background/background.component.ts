import {Component, effect, signal} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
})
export class BackgroundComponent {
  isDarkMode = signal(false);

  constructor() {
    effect(() => {
      const html = document.documentElement;
      this.isDarkMode.set(html.classList.contains('dark'));
    });
  }
}

