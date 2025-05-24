import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(CategoryService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly isEdit = signal(!!this.id);

  readonly form = this.fb.group({
    name: ['', Validators.required],
    typeCategoryRaw: this.fb.control<'IN' | 'OUT'>('IN', Validators.required),
    details: [''],
    isActive: this.fb.control(true),
    reference: ['']
  });

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
    const user = 'user201';
    const tenant = 'd43c999a-368b-4f98-a759-d30d5e59dbc6';

    const data: Partial<Category> = {
      ...this.form.getRawValue(),
      updatedAt: now,
      createdBy: user,
      tenant,
    };

    const request = this.isEdit()
      ? this.service.update(this.id!, data)
      : this.service.create(data);


    request.subscribe(() => {
      this.router.navigate(['/category']).then(() => {
        setTimeout(() => {
          this.service.fetchAll();
        }, 2000);
      });
    });



  }
}
