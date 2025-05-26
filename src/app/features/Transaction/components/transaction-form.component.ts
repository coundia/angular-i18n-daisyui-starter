import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';
import { AlertService } from '../../../shared/components/alert/alert.service';
import { FieldDefinition } from '../../../shared/components/models/field-definition';
import { EntityToolbarActionComponent } from '../../../shared/components/view-toolbar-actions/view-toolbar-actions';
import {toDatetimeLocalString} from '../../../shared/hooks/Parsing';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EntityToolbarActionComponent],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(TransactionService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly alert = inject(AlertService);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly isEdit = signal(!!this.id);
  readonly isLoading = signal(false);

  readonly form = this.fb.group({
    id: [ "" , Validators.required ],
    amount: [ 0 , Validators.required ],
    name: [ "Pas de motif" , Validators.required ],
    details: [ "Pas de description"  ],
    isActive: [ true , Validators.required ],
    account: [ ""  ],
    category: [ ""  ],
    typeTransactionRaw: [ "" , Validators.required ],
    dateTransaction: [ new Date().toISOString().substring(0, 10)  ],
    updatedAt: [ ""  ],
    reference: [ ""  ],
  });

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

  ngOnInit() {
    if (this.isEdit()) {
      let existing = this.service.transactions().find(e => e.id === this.id);
      if (existing) {
        this.form.patchValue({
                id: existing.id,
                amount: existing.amount,
                name: existing.name,
                details: existing.details,
                isActive: existing.isActive,
                account: existing.account,
                category: existing.category,
                typeTransactionRaw: existing.typeTransactionRaw,
                dateTransaction: toDatetimeLocalString(existing.dateTransaction) || '',
                updatedAt: toDatetimeLocalString(existing.updatedAt) || '',
                reference: existing.reference,
        });
      } else {
        this.isLoading.set(true);
        this.service.getById?.(this.id!).subscribe?.({
          next: e => {
            if (e) {
              this.form.patchValue({
                    id: e.id,
                    amount: e.amount,
                    name: e.name,
                    details: e.details,
                    isActive: e.isActive,
                    account: e.account,
                    category: e.category,
                    typeTransactionRaw: e.typeTransactionRaw,
                    dateTransaction: toDatetimeLocalString(e.dateTransaction) || '',
                    updatedAt: toDatetimeLocalString(e.updatedAt) || '',
                    reference: e.reference,
              });
            }
            this.isLoading.set(false);
          },
          error: _ => {
            this.isLoading.set(false);
            this.alert.show('Transaction introuvable', 'error');
          }
        });
      }
    }
  }

  save() {
    if (this.form.invalid) return;

    const now = new Date().toISOString();

    const data: Partial<Transaction> = {
      ...this.form.getRawValue(),
      updatedAt: now
    };

    this.isLoading.set(true);

    data.dateTransaction = new Date(data.dateTransaction || now).toISOString();
    data.updatedAt = new Date(data.updatedAt || now).toISOString();

    const request = this.isEdit()
      ? this.service.update(this.id!, data)
      : this.service.create(data);

    request.subscribe({
      next: async () => {
        this.isLoading.set(false);
        this.alert.show("Operation en cours...!", 'success');
        setTimeout(() => {
          this.alert.show("Opération réussie avec succès!", 'success');
        }, 1000)
        await this.router.navigate(['/transaction']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.alert.show('An error occurred while saving the transaction. Please try again.', 'error');
      }
    });
  }

   onDelete() {
        //todo
      }
}
