import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  readonly alert = inject(AlertService);

  get icon() {
    return this.alert.type() === 'success'
      ? 'M9 12l2 2 4-4'
      : this.alert.type() === 'error'
        ? 'M6 18L18 6M6 6l12 12'
        : 'M13 16h-1v-4h-1m0-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z';
  }

  get cssClass() {
    return {
      'alert-success': this.alert.type() === 'success',
      'alert-error': this.alert.type() === 'error',
      'alert-info': this.alert.type() === 'info',
    };
  }
}
