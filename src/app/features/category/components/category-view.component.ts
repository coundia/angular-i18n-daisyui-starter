import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { FieldDefinition } from '../../../shared/components/models/field-definition';

@Component({
  selector: 'app-category-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-view.component.html',
})
export class CategoryViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(CategoryService);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly item = this.service.categories().find(c => c.id === this.id) as Category;

  readonly fields: FieldDefinition[] = [
    { name: 'name', displayName: 'Nom', type: 'string' },
    {
      name: 'typeCategoryRaw',
      displayName: 'Type',
      type: 'select',
      options: [
        { value: 'IN', label: 'Entrée' },
        { value: 'OUT', label: 'Sortie' }
      ]
    },
    { name: 'details', displayName: 'Détails', type: 'textarea' },
    { name: 'isActive', displayName: 'Actif', type: 'boolean' },
    { name: 'reference', displayName: 'Référence', type: 'string' }
  ];

  getFieldValue(item: Category, field: string): any {
    return (item as Record<string, any>)[field];
  }
}

