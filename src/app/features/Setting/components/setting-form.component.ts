import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { SettingService } from '../services/setting.service';
import { Setting } from '../models/setting.model';
import { AlertService } from '../../../shared/components/alert/alert.service';
import { FieldDefinition } from '../../../shared/components/models/field-definition';
import { EntityToolbarActionComponent } from '../../../shared/components/view-toolbar-actions/view-toolbar-actions';
import {toDatetimeLocalString} from '../../../shared/hooks/Parsing';

@Component({
  selector: 'app-setting-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EntityToolbarActionComponent],
  templateUrl: './setting-form.component.html',
})
export class SettingFormComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(SettingService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly alert = inject(AlertService);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly isEdit = signal(!!this.id);
  readonly isLoading = signal(false);

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
    { name: 'id', displayName: '', type: 'string', entityType: 'String' },
    { name: 'name', displayName: 'Clé', type: 'string', entityType: 'String' },
    { name: 'value', displayName: 'Valeur', type: 'string', entityType: 'String' },
    { name: 'locale', displayName: 'Langue', type: 'string', entityType: 'String' },
    { name: 'details', displayName: 'Description', type: 'string', entityType: 'String' },
    { name: 'isActive', displayName: '', type: 'boolean', entityType: 'Boolean' },
    { name: 'updatedAt', displayName: '', type: 'string', entityType: 'Date' },
    { name: 'reference', displayName: '', type: 'string', entityType: 'String' },
  ];

  ngOnInit() {
    if (this.isEdit()) {
      let existing = this.service.settings().find(e => e.id === this.id);
      if (existing) {
        this.form.patchValue({
                id: existing.id,
                name: existing.name,
                value: existing.value,
                locale: existing.locale,
                details: existing.details,
                isActive: existing.isActive,
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
                    name: e.name,
                    value: e.value,
                    locale: e.locale,
                    details: e.details,
                    isActive: e.isActive,
                    updatedAt: toDatetimeLocalString(e.updatedAt) || '',
                    reference: e.reference,
              });
            }
            this.isLoading.set(false);
          },
          error: _ => {
            this.isLoading.set(false);
            this.alert.show('Setting introuvable', 'error');
          }
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
        await this.router.navigate(['/setting']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.alert.show('An error occurred while saving the setting. Please try again.', 'error');
      }
    });
  }

   onDelete() {
        //todo
      }
}
