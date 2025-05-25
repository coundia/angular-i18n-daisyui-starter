import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import {AlertService} from '../../../shared/components/alert/alert.service';
import {FieldDefinition} from '../../../shared/components/models/field-definition';

type CategoryFormValue = {
  name: string;
  typeCategoryRaw: 'IN' | 'OUT';
  details: string;
  isActive: boolean;
  reference: string;
};

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(CategoryService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly isEdit = signal(!!this.id);
 readonly isLoading = signal(false)
  readonly alert = inject(AlertService)

  readonly form = this.fb.group({
    name: ['', Validators.required],
    typeCategoryRaw: this.fb.control<'IN' | 'OUT'>('IN', Validators.required),
    details: [''],
    isActive: this.fb.control(true),
    reference: ['']
  });

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


  ngOnInit() {
    if (this.isEdit()) {
      const existing = this.service.categories().find(c => c.id === this.id);
      if (existing) {
        this.form.patchValue({
          name: existing.name,
          typeCategoryRaw: existing.typeCategoryRaw,
          details: existing.details,
          isActive: existing.isActive,
          reference: existing.reference,
        });
      }
    }
  }

  save() {
    if (this.form.invalid) return;

    const now = new Date().toISOString();
    const user = 'NA';
    const tenant = 'NA';

    const data: Partial<Category> = {
      ...this.form.getRawValue(),
      updatedAt: now,
      createdBy: user,
      tenant,
    };

    this.isLoading.set(false);

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
        await this.router.navigate(['/category']);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Error saving category:', err);
        this.alert.show('An error occurred while saving the category. Please try again.','error');
      }
    })



  }
}
