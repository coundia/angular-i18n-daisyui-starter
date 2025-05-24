import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  readonly toast = inject(ToastService);

  get cssClass() {
    return {
      'alert-success': this.toast.type() === 'success',
      'alert-error': this.toast.type() === 'error',
      'alert-info': this.toast.type() === 'info',
    };
  }
}
