import {Component, computed, EventEmitter, inject, Input, OnInit, Output, signal} from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';
import {NgClass, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { AlertService } from '../../../shared/components/alert/alert.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { EntityActionsComponent } from '../../../shared/components/actions/entity-actions.component';
import { SearchBoxComponent } from '../../../shared/components/search/search-box.component';
import { EntityToolbarComponent } from '../../../shared/components/toolbar/entity-toolbar.component';
import { EmptyStateComponent } from '../../../shared/components/empty/empty-state.component';
import { PaginationControlsComponent } from '../../../shared/components/pagination/pagination-controls.component';
import { PaginationJoinComponent } from '../../../shared/components/pagination/pagination-join.component';
import { GlobalDrawerComponent } from '../../../shared/components/drawer/global-drawer.component';
import {FieldDefinition} from '../../../shared/components/models/field-definition';
import {GlobalDrawerFormComponent} from '../../../shared/components/drawer/app-global-drawer-form';

import {SortHeaderComponent} from '../../../shared/components/tri/sort-header.component';
import {SortService} from '../../../shared/components/tri/sort.service';
import {SHARED_IMPORTS} from '../../../shared/constantes/shared-imports';

import {getDefaultValue, toDatetimeLocalString} from '../../../shared/hooks/Parsing';


@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
    FormsModule,
    SpinnerComponent,
    EntityActionsComponent,
    SearchBoxComponent,
    EntityToolbarComponent,
    EmptyStateComponent,
    PaginationControlsComponent,
    PaginationJoinComponent,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    GlobalDrawerFormComponent,
    GlobalDrawerComponent,
    NgIf,
    SortHeaderComponent
  ],
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent implements OnInit {
  readonly service = inject(TransactionService);
  readonly alert = inject(AlertService);
  readonly sortService = inject(SortService);

  readonly list = this.service.transactions;
  readonly totalPages = this.service.totalPages;
  readonly isLoading = signal(false);
  readonly page = signal(0);
  readonly size = signal(10);

  searchField = 'name';
  searchTerm = '';

  @Output() searchFieldChange = new EventEmitter<string>();
  @Output() searchTermChange = new EventEmitter<string>();

  readonly selectedItem = signal<Transaction | null>(null);
  readonly allFields: FieldDefinition[] = [
    { name: 'id' , displayName: '', type: 'string', defaultValue: '&quot;&quot;' , entityType: 'String'},
    { name: 'amount' , displayName: 'Montant', type: 'number', defaultValue: '0' , entityType: 'Double'},
    { name: 'name' , displayName: 'Motif', type: 'string', defaultValue: '&quot;Pas de motif&quot;' , entityType: 'String'},
    { name: 'details' , displayName: 'Description', type: 'string', defaultValue: '&quot;Pas de description&quot;' , entityType: 'String'},
    { name: 'isActive' , displayName: 'Activé', type: 'boolean', defaultValue: 'true' , entityType: 'Boolean'},
    { name: 'account' , displayName: 'Compte', type: 'string', defaultValue: '&quot;&quot;' , entityType: 'Account'},
    { name: 'category' , displayName: 'Category', type: 'string', defaultValue: '&quot;&quot;' , entityType: 'Category'},
    { name: 'typeTransactionRaw' , displayName: 'Type', type: 'string', defaultValue: '&quot;&quot;' , entityType: 'enum'},
    { name: 'dateTransaction' , displayName: 'Date transaction', type: 'string', defaultValue: 'new Date().toISOString().substring(0, 10)' , entityType: 'Date'},
    { name: 'updatedAt' , displayName: '', type: 'string', defaultValue: '&quot;&quot;' , entityType: 'Date'},
    { name: 'reference' , displayName: '', type: 'string', defaultValue: '&quot;&quot;' , entityType: 'String'},
  ];

  readonly fieldsToDisplay: FieldDefinition[] = [
    { name: 'amount', displayName: 'Montant', type: 'number' , entityType: 'Double' },
    { name: 'name', displayName: 'Motif', type: 'string' , entityType: 'String' },
    { name: 'details', displayName: 'Description', type: 'string' , entityType: 'String' },
    { name: 'isActive', displayName: 'Activé', type: 'boolean' , entityType: 'Boolean' },
    { name: 'account', displayName: 'Compte', type: 'string' , entityType: 'Account' },
    { name: 'category', displayName: 'Category', type: 'string' , entityType: 'Category' },
    { name: 'typeTransactionRaw', displayName: 'Type', type: 'string' , entityType: 'enum' },
    { name: 'dateTransaction', displayName: 'Date transaction', type: 'string' , entityType: 'Date' },
  ];

  drawerVisible = false;
  title = '';
  submitLabel = '';
  editMode = false;
  itemId?: string;

  readonly fb = inject(FormBuilder);
  form!: FormGroup;
  formKey = signal(0);
  addLink?: string;
  editLink?: string;

  buildForm(fields: FieldDefinition[], data: Record<string, any> = {}): FormGroup {
    const group: Record<string, any> = {};
    for (const field of fields) {
      const defaultValue = data[field.name] ?? getDefaultValue(field) ?? null;
      const isRequired = field.nullable === false;

      if (field.entityType === 'Date' || field.type === 'date') {
        group[field.name] = [toDatetimeLocalString(defaultValue), isRequired ? Validators.required : []];
        continue;
      }

      group[field.name] = [defaultValue, isRequired ? Validators.required : []];
    }
    return this.fb.group(group);
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.isLoading.set(true);
    this.service.fetch(this.page(), this.size()).subscribe({
      next: () => this.isLoading.set(false),
      error: err => {
        this.alert.show('Erreur lors de la récupération des transactions.', 'error');
        this.isLoading.set(false);
      }
    });
  }

  deleteById(id: string): void {
    const item = this.list().find(e => e.id === id);
    if (!item) return;

    const confirmed = window.confirm(`Supprimer "${item.id}" ?`);
    if (!confirmed) return;

    this.service.delete(id).subscribe({
      next: () => {
        this.alert.show(`Transaction "${item.id}" supprimé(e)`, 'success');
        setTimeout(() => this.refresh(), 1500);
      },
      error: err => {
        this.alert.show(`Erreur suppression "${item.id}"`, 'error');
      }
    });
  }

  showDetails(id: string): void {
    const item = this.list().find(e => e.id === id);
    if (!item) return;
    this.selectedItem.set(null);
    setTimeout(() => this.selectedItem.set(item), 0);
  }

  onSearch({ field, value }: { field: string; value: string }): void {
    this.searchField = field;
    this.searchTerm = value;
    if (!value) return this.refresh();
    this.isLoading.set(true);
    this.service.search(field, value).subscribe({
      next: items => {
        this.list.set(items);
        this.isLoading.set(false);
      },
      error: err => {
        this.alert.show('Erreur lors de la recherche.', 'error');
        this.isLoading.set(false);
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.refresh();
  }

  next(): void {
    if (this.page() < this.totalPages() - 1) {
      this.page.update(p => p + 1);
      this.refresh();
    }
  }

  prev(): void {
    if (this.page() > 0) {
      this.page.update(p => p - 1);
      this.refresh();
    }
  }

  getFieldValue(item: Transaction, field: string): any {
    return (item as Record<string, any>)[field];
  }

  handleSave(data: any) {
    const now = new Date().toISOString();
    data.dateTransaction = new Date(data.dateTransaction || now).toISOString();
    data.updatedAt = new Date(data.updatedAt || now).toISOString();

    if (this.editMode && this.itemId) {


      this.service.update(this.itemId, data).subscribe({
        next: () => {
          this.alert.show('Transaction mis(e) à jour avec succès', 'success');
          this.closeDrawer();
          this.refresh();
        },
        error: () => {
          this.alert.show('Erreur lors de la mise à jour', 'error');
        }
      });
    } else {


      this.service.create(data).subscribe({
        next: () => {
          this.alert.show('Transaction créé(e) avec succès', 'success');
          this.closeDrawer();
          this.refresh();
        },
        error: () => {
          this.alert.show('Erreur lors de la création', 'error');
        }
      });
    }
  }

  handleDelete(id: string) {
    const confirmed = window.confirm('Supprimer cet(te) transaction ?');
    if (!confirmed) return;
    this.service.delete(id).subscribe({
      next: () => {
        this.alert.show('Transaction supprimé(e)', 'success');
        this.closeDrawer();
        this.refresh();
      },
      error: () => {
        this.alert.show('Erreur lors de la suppression', 'error');
      }
    });
  }

  closeDrawer() {
    this.drawerVisible = false;
    this.form.reset();
    this.itemId = undefined;
  }

  openDrawerForCreate() {
    this.drawerVisible = false;
    setTimeout(() => {
      this.drawerVisible = true;
      this.formKey.update(k => k + 1);
      this.title = 'Nouveau transaction';
      this.submitLabel = 'Sauvegarder';
      this.editMode = false;
      this.itemId = undefined;
      this.form = this.buildForm(this.allFields);
      this.addLink = '/transaction/new';
    });
  }

  openDrawerForEdit(item: Transaction) {
    this.drawerVisible = false;
    setTimeout(() => {
      this.drawerVisible = true;
      this.formKey.update(k => k + 1);
      this.title = 'Modifier transaction';
      this.submitLabel = 'Mettre à jour';
      this.editMode = true;
      this.itemId = item.id;
      this.form = this.buildForm(this.allFields, item);
      this.editLink = `/transaction/${item.id}/edit`;
    });
  }

  private normalizeForCompare(value: any): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'boolean') return value ? '1' : '0';
    return String(value).toLowerCase();
  }

  readonly sortedList = computed(() => {
    const { active, direction } = this.sortService.state();
    const data = this.list();
    if (!active || !direction) return data;
    return [...data].sort((a, b) => {
      const aValue = this.normalizeForCompare(this.getFieldValue(a, active));
      const bValue = this.normalizeForCompare(this.getFieldValue(b, active));
      return direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  });

  selectedFieldType(): string {
    return this.fieldsToDisplay.find(f => f.name === this.searchField)?.type ?? 'text';
  }
}
