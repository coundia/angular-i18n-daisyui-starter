import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';
import { FieldDefinition } from '../../../shared/components/models/field-definition';
import { EntityToolbarActionComponent } from '../../../shared/components/view-toolbar-actions/view-toolbar-actions';
import { AlertService } from '../../../shared/components/alert/alert.service';

@Component({
  selector: 'app-transaction-view',
  standalone: true,
  imports: [CommonModule, EntityToolbarActionComponent],
  templateUrl: './transaction-view.component.html',
})
export class TransactionViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TransactionService);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly item = signal<Transaction | null>(this.service.transactions().find(e => e.id === this.id) ?? null);
  readonly isLoading = signal(false);

  readonly fields: FieldDefinition[] = [
    { name: 'id', displayName: '', type: 'string', entityType: 'String' },
    { name: 'amount', displayName: 'Montant', type: 'number', entityType: 'Double' },
    { name: 'name', displayName: 'Motif', type: 'string', entityType: 'String' },
    { name: 'details', displayName: 'Description', type: 'string', entityType: 'String' },
    { name: 'isActive', displayName: 'Activé', type: 'boolean', entityType: 'Boolean' },
    { name: 'account', displayName: 'Compte', type: 'string', entityType: 'Account' },
    { name: 'category', displayName: 'Category', type: 'string', entityType: 'Category' },
    { name: 'typeTransactionRaw', displayName: 'Type', type: 'string', entityType: 'enum' },
    { name: 'dateTransaction', displayName: 'Date transaction', type: 'string', entityType: 'Date' },
    { name: 'updatedAt', displayName: '', type: 'string', entityType: 'Date' },
    { name: 'reference', displayName: '', type: 'string', entityType: 'String' },
  ];

  constructor() {
    effect(() => {
      if (!this.item()) {
        this.isLoading.set(true);
        this.service.getById?.(this.id!).subscribe?.({
          next: e => {
            this.item.set(e);
            this.isLoading.set(false);
          },
          error: _ => {
            this.alert.show('Transaction introuvable', 'error');
            this.isLoading.set(false);
          }
        });
      }
    });
  }

   getFieldValue(item: Transaction, field: string): any {
    return (item as Record<string, any>)[field];
  }

  onDelete() {
    const id = this.item()?.id ?? this.id ?? null;
    if (!id) {
      this.alert.show(`Transaction "${this.id}" introuvable`, 'error');
      return;
    }
    const confirmed = window.confirm(`Supprimer "${id}" ?`);
    if (!confirmed) return;
    this.service.delete?.(id).subscribe?.({
      next: () => {
        this.alert.show(`Transaction "${id}" supprimé(e)`, 'success');
        setTimeout(() => {
          this.router.navigate(['/transaction']);
        }, 600);
      },
      error: err => {
        this.alert.show(`Erreur suppression "Transaction ${id}"`, 'error');
      }
    });
  }


}
