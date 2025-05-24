import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {TransactionResponse} from '../responses/TransactionResponse';

@Injectable({
  providedIn: 'root'
})
export class TransactionStreamService {

  constructor(private zone: NgZone) {}


  stream(): Observable<TransactionResponse> {
    return new Observable(observer => {
      const eventSource = new EventSource('http://127.0.0.1:8090/api/v1/queries/transaction/stream');

      const onMessage = (event: MessageEvent) => {
        this.zone.run(() => observer.next(JSON.parse(event.data)));
      };

      eventSource.addEventListener('transaction-init', onMessage);
      eventSource.addEventListener('transaction-update', onMessage);

      eventSource.onerror = (error) => {
        this.zone.run(() => {
          observer.error(error);
          eventSource.close();
        });
      };

      return () => eventSource.close();
    });
  }
}
