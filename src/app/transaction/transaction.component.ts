import {Component, OnInit} from '@angular/core';
import {TransactionResponse} from './responses/TransactionResponse';
import {TransactionStreamService} from './services/transaction-stream.service';
import {SHARED_IMPORTS} from '../shared/constantes/shared-imports';

@Component({
  selector: 'app-transaction',
  imports: [SHARED_IMPORTS],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
  export class TransactionComponent implements OnInit {

  transactions: TransactionResponse[] = [];

  constructor(private sse: TransactionStreamService) {}

  ngOnInit(): void {
    this.sse.stream().subscribe({
      next: (data) => this.transactions.push(data),
      error: (err) => console.error('SSE error:', err)
    });
  }
}
