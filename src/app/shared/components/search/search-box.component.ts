import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FieldDefinition, FieldType } from '../models/field-definition';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {
  @Input() fields: FieldDefinition[] = [];

  @Input() searchField = '';
  @Output() searchFieldChange = new EventEmitter<string>();

  @Input() searchTerm = '';
  @Output() searchTermChange = new EventEmitter<string>();

  @Output() search = new EventEmitter<{ field: string; value: string }>();
  @Output() clear = new EventEmitter<void>();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  get selectedType(): FieldType {
    return this.fields.find(f => f.name === this.searchField)?.type ?? 'string';
  }

  emitSearch() {
    this.search.emit({ field: this.searchField, value: this.searchTerm.trim() });
  }

  emitClear() {
    this.searchTerm = '';
    this.searchTermChange.emit('');
    this.clear.emit();
  }

  onSearchFieldChange(value: string) {
    this.searchField = value;
    this.searchFieldChange.emit(value);
  }

  onSearchTermChange(value: string) {
    this.searchTerm = value;
    this.searchTermChange.emit(value);
  }

  @HostListener('window:keydown', ['$event'])
  handleGlobalShortcut(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
      if (this.searchInput?.nativeElement?.offsetParent !== null) {
        event.preventDefault();
        requestAnimationFrame(() => this.searchInput.nativeElement.focus());
      }
    }
  }
}
