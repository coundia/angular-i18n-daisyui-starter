import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlertService {
  readonly message = signal<string | null>(null);
  readonly type = signal<'success' | 'error' | 'info'>('success');

  readonly isVisible = computed(() => this.message() !== null);

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.message.set(message);
    this.type.set(type);
    setTimeout(() => this.message.set(null), 4000);
  }
}
