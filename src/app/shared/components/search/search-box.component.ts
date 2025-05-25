import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FieldDefinition, FieldType} from '../models/field-definition';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {
  @Input() fields: FieldDefinition[] = [];
  @Input() searchField = '';
  @Input() searchTerm = '';

  @Output() search = new EventEmitter<{ field: string; value: string }>();
  @Output() clear = new EventEmitter<void>();

  get selectedType(): FieldType{
    return this.fields.find(f => f.name === this.searchField)?.type ?? 'string';
  }

  emitSearch() {
    this.search.emit({ field: this.searchField, value: this.searchTerm.trim() });
  }

  emitClear() {
    this.searchTerm = '';
    this.clear.emit();
  }
}
