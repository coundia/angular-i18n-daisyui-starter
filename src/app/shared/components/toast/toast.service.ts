import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly message = signal<string | null>(null);
  readonly type = signal<'success' | 'error' | 'info'>('success');
  readonly isVisible = computed(() => this.message() !== null);

  show(msg: string, type: 'success' | 'error' | 'info' = 'success') {
    this.message.set(msg);
    this.type.set(type);
    setTimeout(() => this.message.set(null), 3000);
  }
}
