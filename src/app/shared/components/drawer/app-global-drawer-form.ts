import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldDefinition } from '../models/field-definition';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-global-drawer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app-global-drawer-form.html',
})
export class GlobalDrawerFormComponent {
  @Input() form!: FormGroup;
  @Input() title!: string;
  @Input() fields!: FieldDefinition[];
  @Input() submitLabel = 'Enregistrer';
  @Input() addLink? = '/';
  @Input() editLink? = '/';
  @Input() editMode = false;
  @Input() itemId?: string;
  @Input() key = 0;

  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  readonly visible = signal(true);
  readonly isVisible = computed(() => this.visible());

  close(): void {
    this.visible.set(false);
    this.closed.emit();
  }

  submit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
    }
  }

  trackByKey(index: number, field: FieldDefinition): string {
    return field.name;
  }
}
