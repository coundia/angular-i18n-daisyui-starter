import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SettingService } from '../services/setting.service';
import { Setting } from '../models/setting.model';
import { FieldDefinition } from '../../../shared/components/models/field-definition';

@Component({
  selector: 'app-setting-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './setting-view.component.html',
})
export class SettingViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(SettingService);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly item = this.service.settings().find(e => e.id === this.id) as Setting;

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

  getFieldValue(item: Setting, field: string): any {
    return (item as Record<string, any>)[field];
  }
}
