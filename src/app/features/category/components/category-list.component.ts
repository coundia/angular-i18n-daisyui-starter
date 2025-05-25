import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
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
import {getDefaultValue} from '../../../shared/hooks/Parsing';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    NgClass,
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
  ],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  readonly service = inject(CategoryService);
  readonly alert = inject(AlertService);
  readonly toast = inject(ToastService);

  readonly list = this.service.categories;
  readonly totalPages = this.service.totalPages;
  readonly isLoading = signal(false);
  readonly page = signal(0);
  readonly size = signal(10);

  searchField = 'name';
  searchTerm = '';

  readonly selectedCategory = signal<Category | null>(null);
  readonly allFields: FieldDefinition[] = [
    { name: 'name', displayName: 'Nom', type: 'string' },
    { name: 'id', displayName: 'ID', type: 'string' },
    { name: 'typeCategoryRaw', displayName: 'Type', type: 'badge' },
    { name: 'createdBy', displayName: 'Créé par', type: 'string' },
    { name: 'isActive', displayName: 'Actif', type: 'boolean', defaultValue: '0' },
    { name: 'reference', displayName: 'Référence', type: 'string' },
    { name: 'details', displayName: 'Détails', type: 'string' },
    { name: 'tenant', displayName: 'Tenant', type: 'string' },
    { name: 'updatedAt', displayName: 'Mis à jour', type: 'date' },
  ];

  readonly fieldsToDisplay: FieldDefinition[] = [
    { name: 'name', displayName: 'Nom', type: 'string' },
    { name: 'typeCategoryRaw', displayName: 'Type', type: 'select' },
    { name: 'details', displayName: 'Détails', type: 'string' },
    { name: 'isActive', displayName: 'Actif', type: 'boolean' },
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
        this.alert.show('Erreur lors de la récupération des catégories.', 'error');
        console.error('[fetch] erreur', err);
        this.isLoading.set(false);
      }
    });
  }

  deleteById(id: string): void {
    const item = this.list().find(c => c.id === id);
    if (!item) return;

    const confirmed = window.confirm(`Supprimer "${item.name}" ?`);
    if (!confirmed) return;

    this.service.delete(id).subscribe({
      next: () => {
        this.alert.show(`Catégorie "${item.name}" supprimée`, 'success');
        setTimeout(() => this.refresh(), 1500);
      },
      error: err => {
        this.alert.show(`Erreur suppression "${item.name}"`, 'error');
        console.error('[delete]', err);
      }
    });
  }

  showDetails(id: string): void {
    const item = this.list().find(c => c.id === id);
    if (!item) return;

    this.selectedCategory.set(null);
    setTimeout(() => this.selectedCategory.set(item), 0);
  }

  onSearch({ field, value }: { field: string; value: string }): void {
    this.searchField = field;
    this.searchTerm = value;

    if (!value) return this.refresh();

    this.isLoading.set(true);
    this.service.search(field, value).subscribe({
      next: categories => {
        this.list.set(categories);
        this.isLoading.set(false);
      },
      error: err => {
        this.alert.show('Erreur lors de la recherche.', 'error');
        console.error('[search]', err);
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

  getFieldValue(item: Category, field: string): any {
    return (item as Record<string, any>)[field];
  }


  handleSave(data: any) {
    if (this.editMode && this.itemId) {
      this.service.update(this.itemId, data).subscribe({
        next: () => {
          this.alert.show('Catégorie mise à jour avec succès', 'success');
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
          this.alert.show('Catégorie créée avec succès', 'success');
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
    const confirmed = window.confirm('Supprimer cette catégorie ?');
    if (!confirmed) return;

    this.service.delete(id).subscribe({
      next: () => {
        this.alert.show('Catégorie supprimée', 'success');
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
      this.title = 'Nouvelle catégorie';
      this.submitLabel = 'Sauvegarder';
      this.editMode = false;
      this.itemId = undefined;
      this.form = this.buildForm(this.allFields);
      this.addLink = '/category/new';
    });
  }

  openDrawerForEdit(category: Category) {
    this.drawerVisible = false;
    setTimeout(() => {
      this.drawerVisible = true;
      this.formKey.update(k => k + 1);
      this.title = 'Modifier la catégorie';
      this.submitLabel = 'Mettre à jour';
      this.editMode = true;
      this.itemId = category.id;
      this.form = this.buildForm(this.allFields, category);
      this.editLink = `/category/${category.id}/edit`;
    });
  }


}
