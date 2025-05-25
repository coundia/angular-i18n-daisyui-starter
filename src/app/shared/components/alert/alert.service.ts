import { Injectable, signal, effect } from '@angular/core';

type AlertType = 'success' | 'error' | 'info';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private queue: { message: string; type: AlertType }[] = [];
  readonly message = signal<string | null>(null);
  readonly type = signal<AlertType>('success');

  private isProcessing = false;

  show(message: string, type: AlertType = 'success') {
    this.queue.push({ message, type });
    this.processQueue();
  }

  private async processQueue() {
    if (this.isProcessing || this.message()) return;
    const next = this.queue.shift();
    if (!next) return;

    this.isProcessing = true;
    this.message.set(next.message);
    this.type.set(next.type);

    await new Promise(resolve => setTimeout(resolve, 4000));

    this.message.set(null);
    this.isProcessing = false;

    // Prochaine notification (récursif)
    if (this.queue.length > 0) {
      this.processQueue();
    }
  }

  get isVisible() {
    return this.message() !== null;
  }

  close() {
    this.message.set(null);
    this.isProcessing = false;
    this.processQueue(); // continue la file si nécessaire
  }

}
