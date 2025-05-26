import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { FieldDefinition } from '../../../shared/components/models/field-definition';
import { EntityToolbarActionComponent } from '../../../shared/components/view-toolbar-actions/view-toolbar-actions';
import { AlertService } from '../../../shared/components/alert/alert.service';

@Component({
  selector: 'app-category-view',
  standalone: true,
  imports: [CommonModule, EntityToolbarActionComponent],
  templateUrl: './category-view.component.html',
})
export class CategoryViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(CategoryService);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly item = signal<Category | null>(this.service.categorys().find(e => e.id === this.id) ?? null);
  readonly isLoading = signal(false);

  readonly fields: FieldDefinition[] = [
    { name: 'id', displayName: '', type: 'string', entityType: 'String' },
    { name: 'name', displayName: 'Nom', type: 'string', entityType: 'String' },
    { name: 'typeCategoryRaw', displayName: '', type: 'string', entityType: 'enum' },
    { name: 'details', displayName: 'Description', type: 'string', entityType: 'String' },
    { name: 'isActive', displayName: '', type: 'boolean', entityType: 'Boolean' },
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
            this.alert.show('Category introuvable', 'error');
            this.isLoading.set(false);
          }
        });
      }
    });
  }

   getFieldValue(item: Category, field: string): any {
    return (item as Record<string, any>)[field];
  }

  onDelete() {
    const id = this.item()?.id ?? this.id ?? null;
    if (!id) {
      this.alert.show(`Category "${this.id}" introuvable`, 'error');
      return;
    }
    const confirmed = window.confirm(`Supprimer "${id}" ?`);
    if (!confirmed) return;
    this.service.delete?.(id).subscribe?.({
      next: () => {
        this.alert.show(`Category "${id}" supprimé(e)`, 'success');
        setTimeout(() => {
          this.router.navigate(['/category']);
        }, 600);
      },
      error: err => {
        this.alert.show(`Erreur suppression "Category ${id}"`, 'error');
      }
    });
  }


}
