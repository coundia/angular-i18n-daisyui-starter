import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { SettingService } from '../services/setting.service';
import { Setting } from '../models/setting.model';
import {AlertService} from '../../../shared/components/alert/alert.service';
import {FieldDefinition} from '../../../shared/components/models/field-definition';

@Component({
  selector: 'app-setting-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './setting-form.component.html',
})
export class SettingFormComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(SettingService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly isEdit = signal(!!this.id);
  readonly isLoading = signal(false)
  readonly alert = inject(AlertService)

  readonly form = this.fb.group({
    id: [ "" , Validators.required ],
    name: [ "" , Validators.required ],
    value: [ "" , Validators.required ],
    locale: [ "" , Validators.required ],
    details: [ "NA"  ],
    isActive: [ true , Validators.required ],
    updatedAt: [ ""  ],
    reference: [ ""  ],
  });

  readonly fields: FieldDefinition[] = [
    { name: 'id', displayName: '', type: 'string' },
    { name: 'name', displayName: 'Clé', type: 'string' },
    { name: 'value', displayName: 'Valeur', type: 'string' },
    { name: 'locale', displayName: 'Langue', type: 'string' },
    { name: 'details', displayName: 'Description', type: 'string' },
    { name: 'isActive', displayName: '', type: 'boolean' },
    { name: 'updatedAt', displayName: '', type: 'string' },
    { name: 'reference', displayName: '', type: 'string' },
  ];

  ngOnInit() {
    if (this.isEdit()) {
      const existing = this.service.settings().find(e => e.id === this.id);
      if (existing) {
        this.form.patchValue({
    id: existing.id,
    name: existing.name,
    value: existing.value,
    locale: existing.locale,
    details: existing.details,
    isActive: existing.isActive,
    updatedAt: existing.updatedAt,
    reference: existing.reference,
        });
      }
    }
  }

  save() {
    if (this.form.invalid) return;

    const now = new Date().toISOString();

    const data: Partial<Setting> = {
      ...this.form.getRawValue(),
      updatedAt: now
    };

    this.isLoading.set(true);

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
        await this.router.navigate(['/setting']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.alert.show('An error occurred while saving the setting. Please try again.','error');
      }
    })
  }
}
